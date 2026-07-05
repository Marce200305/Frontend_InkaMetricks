import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { Transmision } from '../../../models/Transmision';
import { Transmisionservice } from '../../../services/transmisionservice';
import { Canal } from '../../../models/Canal';
import { Canalservice } from '../../../services/canalservice';

@Component({
  selector: 'app-transmision-update',
  imports: [
    MatInputModule, MatButtonModule,
    MatIconModule, MatSelectModule,
    MatRadioModule, MatDatepickerModule,
    MatNativeDateModule, ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './transmision-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './transmision-update.css',
})
export class TransmisionUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Transmision = new Transmision();
  id: number = 0;
  listaCanales: Canal[] = [];

  constructor(private cS: Transmisionservice, private canalS: Canalservice,
    private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.canalS.list().subscribe(data => { this.listaCanales = data; });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      tituloStream: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      enVivo: [false, Validators.required],
      canal: [null, Validators.required],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idTransmision,
        tituloStream: data.tituloStream,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        enVivo: data.enVivo,
        canal: data.canal,
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
      this.obj.idTransmision = this.form.value.codigo;
      this.obj.tituloStream = this.form.value.tituloStream;
      this.obj.fechaInicio = this.form.value.fechaInicio;
      this.obj.fechaFin = this.form.value.fechaFin;
      this.obj.enVivo = this.form.value.enVivo;
      this.obj.canal = this.form.value.canal;
      this.cS.update(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/transmisiones/lista']);
        }
      });
    }
  }
}
