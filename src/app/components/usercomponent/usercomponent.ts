import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserList } from './user-list/user-list';

@Component({
  selector: 'app-usercomponent',
  imports: [RouterOutlet, UserList],
  templateUrl: './usercomponent.html',
  styleUrl: './usercomponent.css',
})
export class Usercomponent {
  constructor(public route: ActivatedRoute) {}
}
