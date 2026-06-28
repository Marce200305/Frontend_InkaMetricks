import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Plan } from '../../../models/Plan';
import { PlanService } from '../../../services/plan-service';

@Component({
  selector: 'app-plan-actualizar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './plan-actualizar.html',
  styleUrl: './plan-actualizar.css',
})
export class PlanActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Plan = new Plan();
  id: number = 0;

  constructor(private cS: PlanService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      name: ['', Validators.required],
      monthlyPrice: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      apiLimit: ['', [Validators.required, Validators.min(1), Validators.max(1000000), Validators.pattern(/^\d+$/)]],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.id,
        name: data.name,
        monthlyPrice: data.monthlyPrice,
        apiLimit: data.apiLimit,
      });
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.id = this.form.value.codigo;
      this.obj.name = this.form.value.name;
      this.obj.monthlyPrice = this.form.value.monthlyPrice;
      this.obj.apiLimit = this.form.value.apiLimit;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/plans/list']); } });
    }
  }
}
