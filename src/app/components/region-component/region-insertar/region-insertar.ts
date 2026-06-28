import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Region } from '../../../models/Region';
import { RegionService } from '../../../services/region-service';

@Component({
  selector: 'app-region-insertar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './region-insertar.html',
  styleUrl: './region-insertar.css',
})
export class RegionInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Region = new Region();

  constructor(private cS: RegionService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.name = this.form.value.name;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/regions/list']); } });
    }
  }
}
