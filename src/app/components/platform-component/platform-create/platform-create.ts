import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Platform } from '../../../models/Platform';
import { PlatformService } from '../../../services/platform-service';

@Component({
  selector: 'app-platform-create',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './platform-create.html',
  styleUrl: './platform-create.css',
})
export class PlatformCreate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Platform = new Platform();

  constructor(private cS: PlatformService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      baseUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/), Validators.maxLength(200)]],
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.name = this.form.value.name;
      this.obj.baseUrl = this.form.value.baseUrl;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/platforms/list']); } });
    }
  }
}
