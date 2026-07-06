import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Plan } from '../../../models/Plan';
import { PlanService } from '../../../services/plan-service';

@Component({
  selector: 'app-plan-insertar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './plan-insertar.html',
  styleUrl: './plan-insertar.css',
})
export class PlanInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Plan = new Plan();

  constructor(private cS: PlanService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      monthlyPrice: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      apiLimit: ['', [Validators.required, Validators.min(1), Validators.max(1000000), Validators.pattern(/^\d+$/)]],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.name = this.form.value.name;
      this.obj.monthlyPrice = this.form.value.monthlyPrice;
      this.obj.apiLimit = this.form.value.apiLimit;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/plans/list']); } });
    }
  }
}
