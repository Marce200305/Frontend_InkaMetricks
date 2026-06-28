import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  selector: 'app-deteccionpublicitaria-actualizar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './deteccionpublicitaria-actualizar.html',
  styleUrl: './deteccionpublicitaria-actualizar.css',
})
export class DeteccionpublicitariaActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: DeteccionPublicitaria = new DeteccionPublicitaria();
  id: number = 0;
  listaTransmisiones: Transmision[] = [];
  listaMarcas: Marca[] = [];

  constructor(
    private cS: DeteccionpublicitariaService,
    private transmisionS: TransmisionService,
    private marcaS: MarcaService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.transmisionS.list().subscribe(data => { this.listaTransmisiones = data; });
    this.marcaS.list().subscribe(data => { this.listaMarcas = data; });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      tipo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      minutoAparicion: ['', [Validators.required, Validators.pattern(/^\d{2}:\d{2}:\d{2}$/)]],
      tiempoAparicionSeg: ['', [Validators.required, Validators.min(1), Validators.max(3600), Validators.pattern(/^\d+$/)]],
      transmision: [null, Validators.required],
      marca: [null, Validators.required],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idDeteccionPublicitaria,
        tipo: data.tipo,
        minutoAparicion: data.minutoAparicion,
        tiempoAparicionSeg: data.tiempoAparicionSeg,
        transmision: data.idTransmision,
        marca: data.idMarca,
      });
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.idDeteccionPublicitaria = this.form.value.codigo;
      this.obj.tipo = this.form.value.tipo;
      this.obj.minutoAparicion = this.form.value.minutoAparicion;
      this.obj.tiempoAparicionSeg = this.form.value.tiempoAparicionSeg;
      this.obj.idTransmision = this.form.value.transmision;
      this.obj.idMarca = this.form.value.marca;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/detecciones-publicitarias/lista']); } });
    }
  }
}
