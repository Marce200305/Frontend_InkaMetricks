import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Brand } from '../../../models/Brand';
import { BrandService } from '../../../services/brand-service';

@Component({
  selector: 'app-brand-create',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './brand-create.html',
  styleUrl: './brand-create.css',
})
export class BrandCreate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Brand = new Brand();

  constructor(private cS: BrandService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      sector: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.name = this.form.value.name;
      this.obj.sector = this.form.value.sector;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/brands/list']); } });
    }
  }
}
