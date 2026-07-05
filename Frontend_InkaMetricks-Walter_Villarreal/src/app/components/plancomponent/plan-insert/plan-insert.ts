import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Plan } from '../../../models/Plan';
import { Planservice } from '../../../services/planservice';

@Component({
  selector: 'app-plan-insert',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './plan-insert.html',
  styleUrl: './plan-insert.css',
})
export class PlanInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Plan = new Plan();

  constructor(private cS: Planservice, private router: Router, private fb: FormBuilder) {}

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
      this.cS.insert(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/planes/lista']);
        }
      });
    }
  }
}
