import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role-service';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users-service';

@Component({
  selector: 'app-role-actualizar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './role-actualizar.html',
  styleUrl: './role-actualizar.css',
})
export class RoleActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Role = new Role();
  id: number = 0;
  listaUsuarios: Users[] = [];

  constructor(private cS: RoleService, private usersS: UsersService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      codigo: [''],
      rol: ['', Validators.required],
      user: [null, Validators.required],
    });
    this.usersS.list().subscribe(data => { this.listaUsuarios = data; this.cdr.detectChanges(); });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.id,
        rol: data.rol,
        user: data.user,
      });
      this.cdr.detectChanges();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.id = this.form.value.codigo;
      this.obj.rol = this.form.value.rol;
      this.obj.user = this.form.value.user;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/roles/lista']); } });
    }
  }
}
