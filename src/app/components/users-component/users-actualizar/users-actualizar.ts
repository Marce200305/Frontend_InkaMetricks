import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  selector: 'app-users-actualizar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatRadioModule, ReactiveFormsModule, CommonModule],
  templateUrl: './users-actualizar.html',
  styleUrl: './users-actualizar.css',
})
export class UsersActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Users = new Users();
  id: number = 0;
  listaEmpresas: Empresa[] = [];

  constructor(private cS: UsersService, private empresaS: EmpresaService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      codigo: [''],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z0-9._-]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      enabled: [true, Validators.required],
      empresa: [null, Validators.required],
    });
    this.empresaS.list().subscribe(data => { this.listaEmpresas = data; this.cdr.detectChanges(); });
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
        empresa: data.idEmpresa,
      });
      this.cdr.detectChanges();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.id = this.form.value.codigo;
      this.obj.username = this.form.value.username;
      this.obj.password = this.form.value.password;
      this.obj.enabled = this.form.value.enabled;
      this.obj.idEmpresa = this.form.value.empresa;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/usuarios/lista']); } });
    }
  }
}
