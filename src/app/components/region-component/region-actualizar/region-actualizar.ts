import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Region } from '../../../models/Region';
import { RegionService } from '../../../services/region-service';

@Component({
  selector: 'app-region-actualizar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './region-actualizar.html',
  styleUrl: './region-actualizar.css',
})
export class RegionActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Region = new Region();
  id: number = 0;

  constructor(private cS: RegionService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
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
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/regiones/lista']); } });
    }
  }
}
