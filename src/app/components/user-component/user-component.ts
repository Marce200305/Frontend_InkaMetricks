import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserList } from './user-list/user-list';

@Component({
  selector: 'app-user-component',
  imports: [RouterOutlet, UserList],
  templateUrl: './user-component.html',
  styleUrl: './user-component.css',
})
export class UserComponent {
  constructor(public route: ActivatedRoute) {}
}
