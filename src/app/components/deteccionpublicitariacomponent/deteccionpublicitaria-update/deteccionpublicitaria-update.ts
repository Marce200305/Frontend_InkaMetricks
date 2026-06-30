import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Deteccionpublicitariaservice } from '../../../services/deteccionpublicitariaservice';
import { DeteccionPublicitaria } from '../../../models/DeteccionPublicitaria';
import { DeteccionpublicitariaList } from '../deteccionpublicitaria-list/deteccionpublicitaria-list';
import { Transmision } from '../../../models/Transmision';
import { Transmisionservice } from '../../../services/transmisionservice';
import { Marca } from '../../../models/Marca';
import { Marcaservice } from '../../../services/marcaservice';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-deteccionpublicitaria-update',
  imports: [CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule, MatOption, MatSelect],
  templateUrl: './deteccionpublicitaria-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './deteccionpublicitaria-update.css',
})
export class DeteccionpublicitariaUpdate implements OnInit{
  form:FormGroup=new FormGroup({});
  dtcP: DeteccionPublicitaria = new DeteccionPublicitaria();
  id: number = 0;
  listaTransmisiones: Transmision[] = [];
  listaMarcas: Marca[] = [];

  constructor(private dtcPS: Deteccionpublicitariaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute, private transmisionS: Transmisionservice,
    private marcaS: Marcaservice,
  ){}

  ngOnInit(): void {
    this.transmisionS.list().subscribe(data => { this.listaTransmisiones = data; });
    this.marcaS.list().subscribe(data => { this.listaMarcas = data; });
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.init();//
    })//

    this.form = this.formBuilder.group({
      idDPublicitaria:[''],
      tipo: ['', Validators.required],
      minutoAparicion: ['', Validators.required],
      tiempoAparicionSeg: ['', Validators.required],
      transmision:[null,Validators.required],
      marca:[null,Validators.required]
    });
  }

  acept() {
    if (this.form.valid) {
      this.dtcP.idDeteccionPublicitaria = this.form.value.idDPublicitaria;
      this.dtcP.tipo = this.form.value.tipo;
      this.dtcP.minutoAparicion = this.form.value.minutoAparicion;
      this.dtcP.tiempoAparicionSeg = this.form.value.tiempoAparicionSeg;
      this.dtcP.transmision = this.form.value.transmision;
      this.dtcP.marca = this.form.value.marca;
      this.dtcPS.update(this.dtcP).subscribe({
        next:()=>{
            this.router.navigate(['/deteccionesPublicitarias/lista'])
        }
      })
    }
  }

  compareById(a: any, b: any): boolean {
    if (!a || !b) return a === b;
    const key = Object.keys(a).find(k => k.toLowerCase().startsWith('id'));
    return key ? a[key] === b[key] : a === b;
  }

  init() {
    this.dtcPS.listId(this.id).subscribe(data => {
      this.form.patchValue({
        idDPublicitaria: data.idDeteccionPublicitaria,
        tipo: data.tipo,
        minutoAparicion: data.minutoAparicion,
        tiempoAparicionSeg: data.tiempoAparicionSeg,
        transmision: data.transmision,
        marca: data.marca
      });
    });
  }
}
