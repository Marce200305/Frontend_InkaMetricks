import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Canal } from '../../../models/Canal';
import { Canalservice } from '../../../services/canalservice';
import { Plataforma } from '../../../models/Plataforma';
import { Streamer } from '../../../models/Streamer';
import { StreamingPlatformData } from '../../../models/StreamingPlatformData';
import { Plataformaservice } from '../../../services/plataformaservice';
import { Streamerservice } from '../../../services/streamerservice';
import { Plataformaresolverserice } from '../../../services/plataformaresolverserice';
import { MatOption } from '@angular/material/core';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-canal-insert',
  imports: [
    MatInputModule, 
    MatDatepickerModule, 
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatOption,
    MatSpinner
  ],
  templateUrl: './canal-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './canal-insert.css',
})
export class CanalInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  cnl: Canal = new Canal();
  listaPlataformas: Plataforma[] = [];
  listaStreamers: Streamer[] = [];
  buscando = false;
  datosPlataforma: StreamingPlatformData | null = null;
  errorBusqueda = '';

  constructor(private cnS: Canalservice,
    private router: Router,
    private formbuilder: FormBuilder,
    private plataformaS: Plataformaservice,
    private streamerS: Streamerservice,
    private resolver: Plataformaresolverserice,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.plataformaS.list().subscribe(data => { this.listaPlataformas = data; this.cdr.detectChanges(); });
    this.streamerS.list().subscribe(data => { this.listaStreamers = data; this.cdr.detectChanges(); });

    this.form = this.formbuilder.group({
      urlCanal: [
        '', Validators.required
      ],
      seguidoresActuales: [0],
      plataforma: [null, Validators.required],
      streamer:[null]
    })
  }

  acept() {
    console.log(this.form.value);
    console.log(this.form.valid);

    if (this.form.valid) {
      this.cnl.urlCanal = this.form.value.urlCanal;
      this.cnl.seguidoresActuales = this.form.value.seguidoresActuales;
      this.cnl.plataforma = this.form.value.plataforma;
      this.cnl.streamer = this.form.value.streamer;
      this.cnS.insert(this.cnl).subscribe({
        next: () => {
          this.router.navigate(['/canales/lista'])
        }
      })
    }
  }

  buscarEnPlataforma(): void {
    const url: string = this.form.value.urlCanal?.trim();
    if (!url) return;

    this.buscando = true;
    this.datosPlataforma = null;
    this.errorBusqueda = '';

    this.resolver.resolve(url).subscribe({
      next: (data) => {
        this.buscando = false;
        if (data) {
          this.datosPlataforma = data;

          const plataformaMatch = this.listaPlataformas.find(p =>
            p.nombre?.toLowerCase().includes(data.plataforma.toLowerCase())
          ) ?? null;

          const streamerMatch = this.listaStreamers.find(s =>
            s.nickname?.toLowerCase() === data.slug?.toLowerCase() ||
            s.nickname?.toLowerCase() === data.displayName?.toLowerCase()
          ) ?? null;

          this.form.patchValue({
            seguidoresActuales: data.followers,
            plataforma: plataformaMatch,
            streamer: streamerMatch,
          });
        } else {
          this.errorBusqueda = 'No se encontró el canal en la plataforma';
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.buscando = false;
        this.errorBusqueda = 'Error al buscar el canal';
        this.cdr.detectChanges();
      }
    });
  }
}
