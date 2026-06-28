import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role-service';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-role-insertar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './role-insertar.html',
  styleUrl: './role-insertar.css',
})
export class RoleInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Role = new Role();
  listaUsuarios: User[] = [];

  constructor(private cS: RoleService, private usersS: UserService, private router: Router, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.usersS.list().subscribe(data => { this.listaUsuarios = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      role: ['', Validators.required],
      user: [null, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.role = this.form.value.role;
      this.obj.user = this.form.value.user;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/roles/list']); } });
    }
  }
}
