import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
import { Transmision } from '../../../models/Transmision';
import { TransmisionService } from '../../../services/transmision-service';
import { Canal } from '../../../models/Canal';
import { CanalService } from '../../../services/canal-service';

@Component({
  selector: 'app-transmision-insertar',
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './transmision-insertar.html',
  styleUrl: './transmision-insertar.css',
})
export class TransmisionInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Transmision = new Transmision();
  listaCanales: Canal[] = [];

  constructor(private cS: TransmisionService, private canalS: CanalService, private router: Router, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.canalS.list().subscribe(data => { this.listaCanales = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      tituloStream: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      enVivo: [false, Validators.required],
      canal: [null, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.tituloStream = this.form.value.tituloStream;
      this.obj.fechaInicio = this.form.value.fechaInicio;
      this.obj.fechaFin = this.form.value.fechaFin;
      this.obj.enVivo = this.form.value.enVivo;
      this.obj.canal = this.form.value.canal;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/transmisiones/lista']); } });
    }
  }
}
