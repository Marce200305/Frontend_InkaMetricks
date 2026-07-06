import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-company-create',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './company-create.html',
  styleUrl: './company-create.css',
})
export class CompanyCreate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Company = new Company();
  listaPlanes: Plan[] = [];

  constructor(private cS: CompanyService, private planS: PlanService, private router: Router, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.planS.list().subscribe(data => { this.listaPlanes = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      tradeName: ['', Validators.required],
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      plan: [null, Validators.required],
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.tradeName = this.form.value.tradeName;
      this.obj.ruc = this.form.value.ruc;
      this.obj.planId = this.form.value.plan;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/companies/list']); } });
    }
  }
}
