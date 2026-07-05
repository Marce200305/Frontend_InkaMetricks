import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Region } from '../../../models/Region';
import { Regionservice } from '../../../services/regionservice';

@Component({
  selector: 'app-region-update',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './region-update.html',
  styleUrl: './region-update.css',
})
export class RegionUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Region = new Region();
  id: number = 0;

  constructor(private cS: Regionservice,
    private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      nombre: ['', Validators.required],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idRegion,
        nombre: data.nombre,
      });
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.idRegion = this.form.value.codigo;
      this.obj.nombre = this.form.value.nombre;
      this.cS.update(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/regiones/lista']);
        }
      });
    }
  }
}
