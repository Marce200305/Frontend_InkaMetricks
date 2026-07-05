import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DeteccionPublicitaria } from '../../../models/DeteccionPublicitaria';
import { Deteccionpublicitariaservice } from '../../../services/deteccionpublicitariaservice';
import { Deteccionpublicitariacomponent } from '../deteccionpublicitariacomponent';
import { Transmision } from '../../../models/Transmision';
import { Transmisionservice } from '../../../services/transmisionservice';
import { Marca } from '../../../models/Marca';
import { Marcaservice } from '../../../services/marcaservice';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-deteccionpublicitaria-insert',
  imports: [
    MatInputModule, 
    MatDatepickerModule, 
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule, MatOption
  ],
  templateUrl: './deteccionpublicitaria-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './deteccionpublicitaria-insert.css',
})
export class DeteccionpublicitariaInsert implements OnInit{
  form:FormGroup=new FormGroup({});
  dtcP: DeteccionPublicitaria = new DeteccionPublicitaria();
  listaTransmisiones: Transmision[] = [];
  listaMarcas: Marca[] = [];

  constructor(private dtcPS:Deteccionpublicitariaservice,
    private router:Router, 
    private formBuilder:FormBuilder, private transmisionS: Transmisionservice,
    private marcaS: Marcaservice, private cdr: ChangeDetectorRef){}
  
  ngOnInit(): void {
    this.transmisionS.list().subscribe(data => { this.listaTransmisiones = data; this.cdr.detectChanges(); });
    this.marcaS.list().subscribe(data => { this.listaMarcas = data; this.cdr.detectChanges(); });
    this.form = this.formBuilder.group({
      tipo:[
        '', Validators.required
      ],
      minutoAparicion:[
        '', Validators.required, 
      ],
      tiempoAparicionSeg:[
        '', Validators.required
      ],
      transmision:[null, Validators.required],
      marca:[null, Validators.required]
    })
  }

  acept() {
    if (this.form.valid) {
      this.dtcP.tipo = this.form.value.tipo;
      this.dtcP.minutoAparicion = this.form.value.minutoAparicion;
      this.dtcP.tiempoAparicionSeg = this.form.value.tiempoAparicionSeg;
      this.dtcP.transmision = this.form.value.transmision;
      this.dtcP.marca = this.form.value.marca;
      this.dtcPS.insert(this.dtcP).subscribe({
        next:()=>{
            this.router.navigate(['/deteccionesPublicitarias/lista'])
        }
      })
    }
  }
}
