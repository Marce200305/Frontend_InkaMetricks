import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Platform } from '../../../models/Platform';
import { PlatformService } from '../../../services/platform-service';

@Component({
  selector: 'app-platform-edit',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './platform-edit.html',
  styleUrl: './platform-edit.css',
})
export class PlatformEdit implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Platform = new Platform();
  id: number = 0;

  constructor(private cS: PlatformService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      baseUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/), Validators.maxLength(200)]],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.id,
        name: data.name,
        baseUrl: data.baseUrl,
      });
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.id = this.form.value.codigo;
      this.obj.name = this.form.value.name;
      this.obj.baseUrl = this.form.value.baseUrl;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/platforms/list']); } });
    }
  }
}
