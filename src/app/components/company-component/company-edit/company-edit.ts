import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Company } from '../../../models/Company';
import { CompanyService } from '../../../services/company-service';
import { Plan } from '../../../models/Plan';
import { PlanService } from '../../../services/plan-service';

@Component({
  selector: 'app-company-edit',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './company-edit.html',
  styleUrl: './company-edit.css',
})
export class CompanyEdit implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Company = new Company();
  id: number = 0;
  listaPlanes: Plan[] = [];

  constructor(private cS: CompanyService, private planS: PlanService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.planS.list().subscribe(data => { this.listaPlanes = data; });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      tradeName: ['', Validators.required],
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      plan: [null, Validators.required],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.id,
        tradeName: data.tradeName,
        ruc: data.ruc,
        plan: data.planId,
      });
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.id = this.form.value.codigo;
      this.obj.tradeName = this.form.value.tradeName;
      this.obj.ruc = this.form.value.ruc;
      this.obj.planId = this.form.value.plan;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/companies/list']); } });
    }
  }
}
