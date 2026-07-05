import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { Users } from '../../../models/Users';
import { Usersservice } from '../../../services/usersservice';
import { Empresa } from '../../../models/Empresa';
import { Empresaservice } from '../../../services/empresaservice';

@Component({
  selector: 'app-user-insert',
  imports: [
    MatInputModule, MatButtonModule,
    MatIconModule, MatSelectModule,
    MatRadioModule, ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './user-insert.html',
  styleUrl: './user-insert.css',
})
export class UserInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Users = new Users();
  listaEmpresas: Empresa[] = [];

  constructor(private cS: Usersservice, private empresaS: Empresaservice,
    private router: Router, private fb: FormBuilder,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.empresaS.list().subscribe(data => {
      this.listaEmpresas = data; this.cdr.detectChanges();
    });
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      enabled: [true, Validators.required],
      empresa: [null, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.username = this.form.value.username;
      this.obj.password = this.form.value.password;
      this.obj.enabled = this.form.value.enabled;
      this.obj.empresa = this.form.value.empresa;
      this.cS.insert(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/usuarios/lista']);
        }
      });
    }
  }
}
