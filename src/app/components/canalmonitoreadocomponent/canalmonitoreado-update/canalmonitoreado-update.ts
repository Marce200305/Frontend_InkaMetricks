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
import { Canalmonitoreadoservice } from '../../../services/canalmonitoreadoservice';
import { CanalMonitoreado } from '../../../models/CanalMonitoreado';
import { CanalmonitoreadoList } from '../canalmonitoreado-list/canalmonitoreado-list';
import { Canal } from '../../../models/Canal';
import { Canalservice } from '../../../services/canalservice';
import { Empresa } from '../../../models/Empresa';
import { Empresaservice } from '../../../services/empresaservice';
import { channel } from 'diagnostics_channel';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-canalmonitoreado-update',
  imports: [CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule, MatOption, MatSelect],
  templateUrl: './canalmonitoreado-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './canalmonitoreado-update.css',
})
export class CanalmonitoreadoUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  cnM: CanalMonitoreado = new CanalMonitoreado();
  id: number = 0;
  listaCanales: Canal[] = [];
  listaEmpresas: Empresa[] = [];
  
  constructor(private cmS: Canalmonitoreadoservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute, private canalS: Canalservice,
    private empresaS: Empresaservice
  ){}

  ngOnInit(): void {
    this.canalS.list().subscribe(data => { this.listaCanales = data; });
    this.empresaS.list().subscribe(data => { this.listaEmpresas = data; });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo:[],
      canal: [null, Validators.required],
      empresa: [null, Validators.required],
    });
  }

  acept() {
    if (this.form.valid) {
      this.cnM.idCanalMonitoreado = this.form.value.codigo;
      this.cnM.canal = this.form.value.canal;
      this.cnM.empresa = this.form.value.empresa;
      this.cmS.update(this.cnM).subscribe({
        next:()=>{
            this.router.navigate(['/canalesMonitoreados/lista'])
        }
      })
    }
  }

  init() {
    this.cmS.listId(this.id).subscribe(data=>{
      this.form.patchValue({
        codigo:data.idCanalMonitoreado,
        canal:data.canal,
        empresa:data.empresa
      })
    })
  }

  compareById(a: any, b: any): boolean {
    if (!a || !b) return a === b;
    const key = Object.keys(a).find(k => k.toLowerCase().startsWith('id'));
    return key ? a[key] === b[key] : a === b;
  }
}
