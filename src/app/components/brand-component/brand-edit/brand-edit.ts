import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Brand } from '../../../models/Brand';
import { BrandService } from '../../../services/brand-service';

@Component({
  selector: 'app-brand-edit',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './brand-edit.html',
  styleUrl: './brand-edit.css',
})
export class BrandEdit implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Brand = new Brand();
  id: number = 0;

  constructor(private cS: BrandService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      sector: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.id,
        name: data.name,
        sector: data.sector,
      });
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.id = this.form.value.codigo;
      this.obj.name = this.form.value.name;
      this.obj.sector = this.form.value.sector;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/brands/list']); } });
    }
  }
}
