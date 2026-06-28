import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Plataforma } from '../../../models/Plataforma';
import { PlataformaService } from '../../../services/plataforma-service';

@Component({
  selector: 'app-plataforma-insertar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './plataforma-insertar.html',
  styleUrl: './plataforma-insertar.css',
})
export class PlataformaInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Plataforma = new Plataforma();

  constructor(private cS: PlataformaService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      urlBase: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/), Validators.maxLength(200)]],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.nombre = this.form.value.nombre;
      this.obj.urlBase = this.form.value.urlBase;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/plataformas/lista']); } });
    }
  }
}
