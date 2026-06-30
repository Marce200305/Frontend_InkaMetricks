import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Transmision } from '../../../models/Transmision';
import { Metricas } from '../../../models/Metricas';
import { Metricasservice } from '../../../services/metricasservice';
import { Transmisionservice } from '../../../services/transmisionservice';

@Component({
  selector: 'app-metricas-update',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './metricas-update.html',
  styleUrl: './metricas-update.css',
})
export class MetricasUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Metricas = new Metricas();
  id: number = 0;
  listaTransmisiones: Transmision[] = [];

  constructor(private cS: Metricasservice,
    private transmisionS: Transmisionservice, private router: Router,
    private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.transmisionS.list().subscribe(data => { this.listaTransmisiones = data; });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      transmision: [null, Validators.required],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idMetricaSnapshot,
        nombre: data.nombre,
        cantidad: data.cantidad,
        transmision: data.transmision,
      });
    });
  }

  compareById(a: any, b: any): boolean {
    if (!a || !b) return a === b;
    const key = Object.keys(a).find(k => k.toLowerCase().startsWith('id'));
    return key ? a[key] === b[key] : a === b;
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.idMetricaSnapshot = this.form.value.codigo;
      this.obj.nombre = this.form.value.nombre;
      this.obj.cantidad = this.form.value.cantidad;
      this.obj.transmision = this.form.value.transmision;
      this.cS.update(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/metricas/lista']);
        }
      });
    }
  }
}
