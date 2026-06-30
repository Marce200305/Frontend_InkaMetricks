import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CanalMonitoreado } from '../../../models/CanalMonitoreado';
import { Canalmonitoreadoservice } from '../../../services/canalmonitoreadoservice';
import { Canalmonitoreadocomponent } from '../canalmonitoreadocomponent';
import { Empresa } from '../../../models/Empresa';
import { Empresaservice } from '../../../services/empresaservice';
import { Canal } from '../../../models/Canal';
import { Canalservice } from '../../../services/canalservice';
import { ChangeDetectorRef } from '@angular/core';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-canalmonitoreado-insert',
  imports: [MatInputModule, 
    MatDatepickerModule, 
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule, MatOption],
  templateUrl: './canalmonitoreado-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './canalmonitoreado-insert.css',
})
export class CanalmonitoreadoInsert implements OnInit{
  form:FormGroup=new FormGroup({});
  cM: CanalMonitoreado = new CanalMonitoreado();
  listaCanales: Canal[] = [];
  listaEmpresas: Empresa[] = [];

  constructor(private cmS:Canalmonitoreadoservice,
    private router:Router, 
    private formBuilder:FormBuilder, private canalS: Canalservice,
    private empresaS: Empresaservice, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.canalS.list().subscribe(data => { this.listaCanales = data; this.cdr.detectChanges(); });
    this.empresaS.list().subscribe(data => { this.listaEmpresas = data; this.cdr.detectChanges(); });
    this.form=this.formBuilder.group({
      channel:[null, Validators.required],
      enterprise:[null]
    })
  }

  acept() {
    if (this.form.valid) {
      this.cM.canal = this.form.value.channel;
      this.cM.empresa = this.form.value.enterprise;
      this.cmS.insert(this.cM).subscribe({
        next:()=>{
            this.router.navigate(['/canalesMonitoreados/lista'])
        }
      })
    }
  }
}
