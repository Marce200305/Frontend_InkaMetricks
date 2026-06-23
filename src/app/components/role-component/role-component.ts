import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RoleListar } from './role-listar/role-listar';

@Component({
  selector: 'app-role-component',
  imports: [RouterOutlet, RoleListar],
  templateUrl: './role-component.html',
  styleUrl: './role-component.css',
})
export class RoleComponent {
  constructor(public route: ActivatedRoute) {}
}
