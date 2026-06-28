import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user-service';
import { Company } from '../../../models/Company';
import { CompanyService } from '../../../services/company-service';

@Component({
  selector: 'app-user-create',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatRadioModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-create.html',
  styleUrl: './user-create.css',
})
export class UserCreate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: User = new User();
  listaCompanies: Company[] = [];

  constructor(
    private cS: UserService,
    private companyS: CompanyService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.companyS.list().subscribe(data => { this.listaCompanies = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      enabled: [true, Validators.required],
      company: [null, Validators.required],
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.username = this.form.value.username;
      this.obj.password = this.form.value.password;
      this.obj.enabled = this.form.value.enabled;
      this.obj.companyId = this.form.value.company;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/users/list']); } });
    }
  }
}
