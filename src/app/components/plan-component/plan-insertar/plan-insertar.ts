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
      nombre: ['', Validators.required],
      precioMensual: ['', Validators.required],
      limiteApi: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.nombre = this.form.value.nombre;
      this.obj.precioMensual = this.form.value.precioMensual;
      this.obj.limiteApi = this.form.value.limiteApi;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/planes/lista']); } });
    }
  }
}
