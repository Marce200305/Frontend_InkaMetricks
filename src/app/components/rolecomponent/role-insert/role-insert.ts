import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../../models/Role';
import { Roleservice } from '../../../services/roleservice';
import { Users } from '../../../models/Users';
import { Usersservice } from '../../../services/usersservice';

@Component({
  selector: 'app-role-insert',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './role-insert.html',
  styleUrl: './role-insert.css',
})
export class RoleInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Role = new Role();
  listaUsuarios: Users[] = [];

  constructor(private cS: Roleservice, private usersS: Usersservice,
    private router: Router, private fb: FormBuilder,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.usersS.list().subscribe(data => { this.listaUsuarios = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      rol: ['', Validators.required],
      user: [null, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.rol = this.form.value.rol;
      this.obj.users = this.form.value.user;
      this.cS.insert(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/roles/lista']);
        }
      });
    }
  }
}
