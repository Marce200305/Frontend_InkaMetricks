import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  selector: 'app-role-update',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './role-update.html',
  styleUrl: './role-update.css',
})
export class RoleUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Role = new Role();
  id: number = 0;
  listaUsuarios: Users[] = [];

  constructor(private cS: Roleservice,
    private usersS: Usersservice,
    private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

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
        user: data.users,
      });
      this.cdr.detectChanges();
    });
  }

  compareById(a: any, b: any): boolean {
    if (!a || !b) return a === b;
    const key = Object.keys(a).find(k => k.toLowerCase().startsWith('id'));
    return key ? a[key] === b[key] : a === b;
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.id = this.form.value.codigo;
      this.obj.rol = this.form.value.rol;
      this.obj.users = this.form.value.user;
      this.cS.update(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/roles/lista']);
        }
      });
    }
  }
}
