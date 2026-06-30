import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Plataforma } from '../../../models/Plataforma';
import { Plataformaservice } from '../../../services/plataformaservice';

@Component({
  selector: 'app-plataforma-insert',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './plataforma-insert.html',
  styleUrl: './plataforma-insert.css',
})
export class PlataformaInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Plataforma = new Plataforma();

  constructor(private cS: Plataformaservice,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      urlBase: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.nombre = this.form.value.nombre;
      this.obj.urlBase = this.form.value.urlBase;
      this.cS.insert(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/plataformas/lista']);
        }
      });
    }
  }
}
