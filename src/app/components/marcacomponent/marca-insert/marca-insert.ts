import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Marca } from '../../../models/Marca';
import { Marcaservice } from '../../../services/marcaservice';

@Component({
  selector: 'app-marca-insert',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule],
  templateUrl: './marca-insert.html',
  styleUrl: './marca-insert.css',
})
export class MarcaInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Marca = new Marca();

  constructor(private cS: Marcaservice,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      sector: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.nombre = this.form.value.nombre;
      this.obj.sector = this.form.value.sector;
      this.cS.insert(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/marcas/lista']);
        }
      });
    }
  }
}
