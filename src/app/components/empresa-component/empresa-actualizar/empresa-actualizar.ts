import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Empresa } from '../../../models/Empresa';
import { EmpresaService } from '../../../services/empresa-service';
import { Plan } from '../../../models/Plan';
import { PlanService } from '../../../services/plan-service';

@Component({
  selector: 'app-empresa-actualizar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './empresa-actualizar.html',
  styleUrl: './empresa-actualizar.css',
})
export class EmpresaActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Empresa = new Empresa();
  id: number = 0;
  listaPlanes: Plan[] = [];

  constructor(private cS: EmpresaService, private planS: PlanService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.planS.list().subscribe(data => { this.listaPlanes = data; });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      nombreComercial: ['', Validators.required],
      ruc: ['', Validators.required],
      plan: [null, Validators.required],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idEmpresa,
        nombreComercial: data.nombreComercial,
        ruc: data.ruc,
        plan: data.plan,
      });
    });
  }

  compareById(a: any, b: any): boolean {
    if (!a || !b) return a === b;
    const key = Object.keys(a).find(k => k.toLowerCase().startsWith('id'));
    return key ? a[key] === b[key] : a === b;
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.idEmpresa = this.form.value.codigo;
      this.obj.nombreComercial = this.form.value.nombreComercial;
      this.obj.ruc = this.form.value.ruc;
      this.obj.plan = this.form.value.plan;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/empresas/lista']); } });
    }
  }
}
