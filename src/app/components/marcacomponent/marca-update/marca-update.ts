import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Marca } from '../../../models/Marca';
import { Marcaservice } from '../../../services/marcaservice';

@Component({
  selector: 'app-marca-update',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './marca-update.html',
  styleUrl: './marca-update.css',
})
export class MarcaUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Marca = new Marca();
  id: number = 0;

  constructor(private cS: Marcaservice,
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
      sector: ['', Validators.required],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idMarca,
        nombre: data.nombre,
        sector: data.sector
      });
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.idMarca = this.form.value.codigo;
      this.obj.nombre = this.form.value.nombre;
      this.obj.sector = this.form.value.sector;
      this.cS.update(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/marcas/lista']);
        }
      });
    }
  }
}
