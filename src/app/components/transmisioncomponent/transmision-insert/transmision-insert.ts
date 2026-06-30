import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Transmision } from '../../../models/Transmision';
import { Transmisionservice } from '../../../services/transmisionservice';
import { Canal } from '../../../models/Canal';
import { Canalservice } from '../../../services/canalservice';
import { Plataformaresolverserice } from '../../../services/plataformaresolverserice';

@Component({
  selector: 'app-transmision-insert',
  imports: [
    MatInputModule, MatButtonModule,
    MatIconModule, MatSelectModule,
    MatRadioModule, MatDatepickerModule,
    MatNativeDateModule, MatProgressSpinnerModule,
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './transmision-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './transmision-insert.css',
})
export class TransmisionInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Transmision = new Transmision();
  listaCanales: Canal[] = [];
  buscando = false;
  mensajePlataforma = '';

  constructor(
    private cS: Transmisionservice,
    private canalS: Canalservice,
    private resolver: Plataformaresolverserice,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.canalS.list().subscribe(data => { this.listaCanales = data; });
    this.form = this.fb.group({
      tituloStream: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: [null],
      enVivo: [false],
      canal: [null, Validators.required],
    });
  }

  alSeleccionarCanal(): void {
    const canal: Canal = this.form.value.canal;
    if (!canal?.urlCanal) return;

    this.buscando = true;
    this.mensajePlataforma = '';

    this.resolver.resolve(canal.urlCanal).subscribe({
      next: (data) => {
        this.buscando = false;
        if (data?.isLive && data.stream) {
          this.form.patchValue({
            tituloStream: data.stream.title,
            enVivo: true,
            fechaInicio: data.stream.startedAt ? new Date(data.stream.startedAt) : null,
          });
          this.mensajePlataforma = `✓ En vivo: "${data.stream.title}" — ${data.stream.viewers.toLocaleString()} viewers`;
        } else if (data) {
          this.form.patchValue({ enVivo: false });
          this.mensajePlataforma = `✓ Canal encontrado: ${data.displayName} — Sin transmisión activa`;
        }
      },
      error: () => {
        this.buscando = false;
        this.mensajePlataforma = '✗ No se pudo obtener datos de la plataforma';
      }
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.tituloStream = this.form.value.tituloStream;
      this.obj.fechaInicio = this.form.value.fechaInicio;
      this.obj.fechaFin = this.form.value.fechaFin;
      this.obj.enVivo = this.form.value.enVivo;
      this.obj.canal = this.form.value.canal;
      this.cS.insert(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/transmisiones/lista']);
        }
      });
    }
  }
}
