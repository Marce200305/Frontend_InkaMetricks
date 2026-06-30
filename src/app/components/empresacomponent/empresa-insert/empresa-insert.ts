import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Empresa } from '../../../models/Empresa';
import { Empresaservice } from '../../../services/empresaservice';
import { Empresacomponent } from '../empresacomponent';
import { Plan } from '../../../models/Plan';
import { Planservice } from '../../../services/planservice';
import { ChangeDetectorRef } from '@angular/core';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-empresa-insert',
  imports: [
    MatInputModule, 
    MatDatepickerModule, 
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule, MatOption
  ],
  templateUrl: './empresa-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './empresa-insert.css',
})
export class EmpresaInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  emp: Empresa = new Empresa();
  listaPlanes: Plan[] = [];

  constructor(private eS:Empresaservice,
    private router:Router, 
    private formBuilder: FormBuilder, private planesS: Planservice,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      nombreComercial:['', Validators.required],
      ruc:[
        '', Validators.required
      ],
      plan:[
        null, Validators.required
      ]
    })
  }

  acept() {
    if (this.form.valid) {
      this.emp.nombreComercial = this.form.value.nombreComercial;
      this.emp.ruc = this.form.value.ruc;
      this.emp.plan = this.form.value.plan;
      this.eS.insert(this.emp).subscribe({
        next:()=>{
            this.router.navigate(['/empresas/lista'])
        }
      })
    }
  }
}
