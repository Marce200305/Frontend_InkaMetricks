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
import { TransmisionService } from '../../../services/transmision-service';
import { Canal } from '../../../models/Canal';
import { CanalService } from '../../../services/canal-service';

@Component({
  selector: 'app-transmision-actualizar',
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './transmision-actualizar.html',
  styleUrl: './transmision-actualizar.css',
})
export class TransmisionActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Transmision = new Transmision();
  id: number = 0;
  listaCanales: Canal[] = [];

  constructor(private cS: TransmisionService, private canalS: CanalService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.canalS.list().subscribe(data => { this.listaCanales = data; });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      tituloStream: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
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
        canal: data.idCanal,
      });
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.idTransmision = this.form.value.codigo;
      this.obj.tituloStream = this.form.value.tituloStream;
      this.obj.fechaInicio = this.form.value.fechaInicio;
      this.obj.fechaFin = this.form.value.fechaFin;
      this.obj.enVivo = this.form.value.enVivo;
      this.obj.idCanal = this.form.value.canal;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/transmisiones/lista']); } });
    }
  }
}
