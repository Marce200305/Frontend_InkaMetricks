import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  selector: 'app-user-edit',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatRadioModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: User = new User();
  id: number = 0;
  listaCompanies: Company[] = [];

  constructor(
    private cS: UserService,
    private companyS: CompanyService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.companyS.list().subscribe(data => { this.listaCompanies = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      codigo: [''],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      enabled: [true, Validators.required],
      company: [null, Validators.required],
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.id,
        username: data.username,
        password: data.password,
        enabled: data.enabled,
        company: data.companyId,
      });
      this.cdr.detectChanges();
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.id = this.form.value.codigo;
      this.obj.username = this.form.value.username;
      this.obj.password = this.form.value.password;
      this.obj.enabled = this.form.value.enabled;
      this.obj.companyId = this.form.value.company;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/users/list']); } });
    }
  }
}
