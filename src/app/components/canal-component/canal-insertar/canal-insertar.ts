import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Canal } from '../../../models/Canal';
import { CanalService } from '../../../services/canal-service';
import { Plataforma } from '../../../models/Plataforma';
import { PlataformaService } from '../../../services/plataforma-service';
import { Streamer } from '../../../models/Streamer';
import { StreamerService } from '../../../services/streamer-service';
import { PlatformResolverService } from '../../../services/platform-resolver-service';
import { StreamingPlatformData } from '../../../models/StreamingPlatformData';

@Component({
  selector: 'app-canal-insertar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatProgressSpinnerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './canal-insertar.html',
  styleUrl: './canal-insertar.css',
})
export class CanalInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Canal = new Canal();
  listaPlataformas: Plataforma[] = [];
  listaStreamers: Streamer[] = [];
  buscando = false;
  datosPlataforma: StreamingPlatformData | null = null;
  errorBusqueda = '';

  constructor(
    private cS: CanalService,
    private plataformaS: PlataformaService,
    private streamerS: StreamerService,
    private resolver: PlatformResolverService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.plataformaS.list().subscribe(data => { this.listaPlataformas = data; this.cdr.detectChanges(); });
    this.streamerS.list().subscribe(data => { this.listaStreamers = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      urlCanal: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/), Validators.maxLength(2048)]],
      seguidoresActuales: [0, [Validators.min(0)]],
      plataforma: [null, Validators.required],
      streamer: [null],
    });
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
            plataforma: plataformaMatch?.idPlataforma ?? null,
            streamer: streamerMatch?.idStreamer ?? null,
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

  aceptar(): void {
    if (this.form.valid) {
      this.obj.urlCanal = this.form.value.urlCanal;
      this.obj.seguidoresActuales = this.form.value.seguidoresActuales;
      this.obj.idPlataforma = this.form.value.plataforma;
      this.obj.idStreamer = this.form.value.streamer;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/canales/lista']); } });
    }
  }
}
