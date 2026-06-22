import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { DeteccionPublicitaria } from '../../../models/DeteccionPublicitaria';
import { DeteccionpublicitariaService } from '../../../services/deteccionpublicitaria-service';
import { Transmision } from '../../../models/Transmision';
import { TransmisionService } from '../../../services/transmision-service';
import { Marca } from '../../../models/Marca';
import { MarcaService } from '../../../services/marca-service';

@Component({
  selector: 'app-deteccionpublicitaria-insertar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './deteccionpublicitaria-insertar.html',
  styleUrl: './deteccionpublicitaria-insertar.css',
})
export class DeteccionpublicitariaInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: DeteccionPublicitaria = new DeteccionPublicitaria();
  listaTransmisiones: Transmision[] = [];
  listaMarcas: Marca[] = [];

  constructor(
    private cS: DeteccionpublicitariaService,
    private transmisionS: TransmisionService,
    private marcaS: MarcaService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.transmisionS.list().subscribe(data => { this.listaTransmisiones = data; this.cdr.detectChanges(); });
    this.marcaS.list().subscribe(data => { this.listaMarcas = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      tipo: ['', Validators.required],
      minutoAparicion: ['', Validators.required],
      tiempoAparicionSeg: ['', Validators.required],
      transmision: [null, Validators.required],
      marca: [null, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.tipo = this.form.value.tipo;
      this.obj.minutoAparicion = this.form.value.minutoAparicion;
      this.obj.tiempoAparicionSeg = this.form.value.tiempoAparicionSeg;
      this.obj.transmision = this.form.value.transmision;
      this.obj.marca = this.form.value.marca;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/detecciones-publicitarias/lista']); } });
    }
  }
}
