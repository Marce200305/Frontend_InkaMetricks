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
import { UsersService } from '../../../services/users-service';
import { Empresa } from '../../../models/Empresa';
import { EmpresaService } from '../../../services/empresa-service';

@Component({
  selector: 'app-users-insertar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatRadioModule, ReactiveFormsModule, CommonModule],
  templateUrl: './users-insertar.html',
  styleUrl: './users-insertar.css',
})
export class UsersInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Users = new Users();
  listaEmpresas: Empresa[] = [];

  constructor(private cS: UsersService, private empresaS: EmpresaService, private router: Router, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.empresaS.list().subscribe(data => { this.listaEmpresas = data; this.cdr.detectChanges(); });
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
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/usuarios/lista']); } });
    }
  }
}
