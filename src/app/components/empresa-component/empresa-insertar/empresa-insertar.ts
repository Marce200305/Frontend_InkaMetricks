import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-empresa-insertar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './empresa-insertar.html',
  styleUrl: './empresa-insertar.css',
})
export class EmpresaInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Empresa = new Empresa();
  listaPlanes: Plan[] = [];

  constructor(private cS: EmpresaService, private planS: PlanService, private router: Router, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.planS.list().subscribe(data => { this.listaPlanes = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      nombreComercial: ['', Validators.required],
      ruc: ['', Validators.required],
      plan: [null, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.nombreComercial = this.form.value.nombreComercial;
      this.obj.ruc = this.form.value.ruc;
      this.obj.plan = this.form.value.plan;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/empresas/lista']); } });
    }
  }
}
