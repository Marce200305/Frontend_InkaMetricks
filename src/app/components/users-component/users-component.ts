import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UsersListar } from './users-listar/users-listar';

@Component({
  selector: 'app-users-component',
  imports: [RouterOutlet, UsersListar],
  templateUrl: './users-component.html',
  styleUrl: './users-component.css',
})
export class UsersComponent {
  constructor(public route: ActivatedRoute) {}
}
