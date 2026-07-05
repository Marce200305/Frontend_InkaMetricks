import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RoleList } from './role-list/role-list';

@Component({
  selector: 'app-rolecomponent',
  imports: [RouterOutlet, RoleList],
  templateUrl: './rolecomponent.html',
  styleUrl: './rolecomponent.css',
})
export class Rolecomponent {
  constructor(public route: ActivatedRoute) {}
}
