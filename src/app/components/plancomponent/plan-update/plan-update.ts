import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Plan } from '../../../models/Plan';
import { Planservice } from '../../../services/planservice';

@Component({
  selector: 'app-plan-update',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './plan-update.html',
  styleUrl: './plan-update.css',
})
export class PlanUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Plan = new Plan();
  id: number = 0;

  constructor(private cS: Planservice, private router: Router,
    private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      nombre: ['', Validators.required],
      precioMensual: ['', Validators.required],
      limiteApi: ['', Validators.required],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idPlan,
        nombre: data.nombre,
        precioMensual: data.precioMensual,
        limiteApi: data.limiteApi
      });
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.idPlan = this.form.value.codigo;
      this.obj.nombre = this.form.value.nombre;
      this.obj.precioMensual = this.form.value.precioMensual;
      this.obj.limiteApi = this.form.value.limiteApi;
      this.cS.update(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/planes/lista']);
        }
      });
    }
  }
}
