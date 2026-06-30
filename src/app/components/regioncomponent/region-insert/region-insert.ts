import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Region } from '../../../models/Region';
import { Regionservice } from '../../../services/regionservice';

@Component({
  selector: 'app-region-insert',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './region-insert.html',
  styleUrl: './region-insert.css',
})
export class RegionInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Region = new Region();

  constructor(private cS: Regionservice, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  aceptar(): void {
    console.log("Entro");
    console.log(this.form.value);
    console.log(this.obj);

    if (this.form.valid) {
      this.obj.nombre = this.form.value.nombre;
      this.cS.insert(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/regiones/lista']);
        }
      });
    }
  }
}
