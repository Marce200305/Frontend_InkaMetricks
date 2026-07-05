import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Transmision } from '../../../models/Transmision';
import { Metricas } from '../../../models/Metricas';
import { Metricasservice } from '../../../services/metricasservice';
import { Transmisionservice } from '../../../services/transmisionservice';
import { Plataforma } from '../../../models/Plataforma';
import { Plataformaresolverserice } from '../../../services/plataformaresolverserice';

@Component({
  selector: 'app-metricas-insert',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './metricas-insert.html',
  styleUrl: './metricas-insert.css',
})
export class MetricasInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Metricas = new Metricas();
  listaTransmisiones: Transmision[] = [];
  buscando = false;
  mensajePlataforma = '';
  datosPlataforma: any = null;

  readonly METRICAS = [
    { valor: 'viewers',    label: 'Espectadores en vivo',  fuente: 'viewers' },
    { valor: 'seguidores', label: 'Seguidores del canal',  fuente: 'followers' },
    { valor: 'clips',      label: 'Clips generados',       fuente: null },
    { valor: 'chat',       label: 'Mensajes de chat',      fuente: null },
    { valor: 'donaciones', label: 'Donaciones recibidas',  fuente: null },
    { valor: 'subs',       label: 'Suscriptores nuevos',   fuente: null },
    { valor: 'hype_train', label: 'Hype Train activado',   fuente: null },
  ];

  constructor(
    private cS: Metricasservice,
    private transmisionS: Transmisionservice,
    private resolver: Plataformaresolverserice,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.transmisionS.list().subscribe(data => { this.listaTransmisiones = data; });
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      transmision: [null, Validators.required],
    });
  }

  alSeleccionarTransmision(): void {
    const transmision: Transmision = this.form.value.transmision;
    const urlCanal = (transmision as any)?.canal?.urlCanal;
    if (!urlCanal) return;

    this.buscando = true;
    this.mensajePlataforma = '';

    this.resolver.resolve(urlCanal).subscribe({
      next: (data) => {
        this.buscando = false;
        this.datosPlataforma = data;
        const estado = data?.isLive
          ? `✓ En vivo — ${data.stream!.viewers.toLocaleString()} viewers | ${data.followers.toLocaleString()} seguidores`
          : data
            ? `Canal offline — ${data.followers.toLocaleString()} seguidores`
            : '';
        this.mensajePlataforma = estado;
        this.autocompletarCantidad();
      },
      error: () => {
        this.buscando = false;
        this.mensajePlataforma = '✗ No se pudo obtener datos';
      }
    });
  }

  alSeleccionarMetrica(): void {
    this.autocompletarCantidad();
  }

  private autocompletarCantidad(): void {
    const metricaValor = this.form.value.nombre;
    const metrica = this.METRICAS.find(m => m.valor === metricaValor);
    if (!metrica?.fuente || !this.datosPlataforma) return;

    let cantidad: number | null = null;
    if (metrica.fuente === 'viewers' && this.datosPlataforma.isLive) {
      cantidad = this.datosPlataforma.stream?.viewers ?? null;
    } else if (metrica.fuente === 'followers') {
      cantidad = this.datosPlataforma.followers ?? null;
    }
    if (cantidad !== null) this.form.patchValue({ cantidad });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.nombre = this.form.value.nombre;
      this.obj.cantidad = this.form.value.cantidad;
      this.obj.transmision = this.form.value.transmision;
      this.cS.insert(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/metricas/lista']);
        }
      });
    }
  }
}
