import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Plataforma } from '../../../models/Plataforma';
import { PlataformaService } from '../../../services/plataforma-service';

@Component({
  selector: 'app-plataforma-actualizar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './plataforma-actualizar.html',
  styleUrl: './plataforma-actualizar.css',
})
export class PlataformaActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Plataforma = new Plataforma();
  id: number = 0;

  constructor(private cS: PlataformaService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      nombre: ['', Validators.required],
      urlBase: ['', Validators.required],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idPlataforma,
        nombre: data.nombre,
        urlBase: data.urlBase,
      });
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.idPlataforma = this.form.value.codigo;
      this.obj.nombre = this.form.value.nombre;
      this.obj.urlBase = this.form.value.urlBase;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/plataformas/lista']); } });
    }
  }
}
