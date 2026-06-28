import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Marca } from '../../../models/Marca';
import { MarcaService } from '../../../services/marca-service';

@Component({
  selector: 'app-marca-actualizar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './marca-actualizar.html',
  styleUrl: './marca-actualizar.css',
})
export class MarcaActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Marca = new Marca();
  id: number = 0;

  constructor(private cS: MarcaService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      sector: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idMarca,
        nombre: data.nombre,
        sector: data.sector,
      });
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.idMarca = this.form.value.codigo;
      this.obj.nombre = this.form.value.nombre;
      this.obj.sector = this.form.value.sector;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/marcas/lista']); } });
    }
  }
}
