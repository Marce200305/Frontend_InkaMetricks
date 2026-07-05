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
import { Empresaservice } from '../../../services/empresaservice';
import { Empresa } from '../../../models/Empresa';
import { EmpresaList } from '../empresa-list/empresa-list';
import { Plan } from '../../../models/Plan';
import { Planservice } from '../../../services/planservice';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-empresa-update',
  imports: [
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule, MatOption, MatSelect
  ],
  templateUrl: './empresa-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './empresa-update.css',
})
export class EmpresaUpdate implements OnInit{
  form: FormGroup = new FormGroup({});
  emp: Empresa = new Empresa();
  id: number = 0;
  listaPlanes: Plan[] = [];

  constructor(private eS: Empresaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private plS:Planservice
  ){}

  ngOnInit(): void {
    this.plS.list().subscribe(data => { this.listaPlanes = data; });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.formBuilder.group({
      id:[''],
      nombreComercial:[
        '', Validators.required
      ],
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
      this.emp.idEmpresa = this.form.value.id;
      this.emp.nombreComercial = this.form.value.nombreComercial;
      this.emp.ruc = this.form.value.ruc;
      this.emp.plan = this.form.value.plan;
      this.eS.update(this.emp).subscribe({
        next:()=>{
            this.router.navigate(['/empresas/lista'])
        }
      })
    }
  }

  init() {
    this.eS.listId(this.id).subscribe(data=>{
      this.form.patchValue({
        id:data.idEmpresa,
        nombreComercial:data.nombreComercial,
        ruc:data.ruc,
        plan:data.plan
      })
    })
  }

  compareById(a: any, b: any): boolean {
    if (!a || !b) return a === b;
    const key = Object.keys(a).find(k => k.toLowerCase().startsWith('id'));
    return key ? a[key] === b[key] : a === b;
  }
}
