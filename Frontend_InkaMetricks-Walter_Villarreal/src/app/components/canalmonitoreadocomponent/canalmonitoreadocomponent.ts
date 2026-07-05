import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CanalmonitoreadoList } from './canalmonitoreado-list/canalmonitoreado-list';

@Component({
  selector: 'app-canalmonitoreadocomponent',
  imports: [RouterOutlet, CanalmonitoreadoList],
  templateUrl: './canalmonitoreadocomponent.html',
  styleUrl: './canalmonitoreadocomponent.css',
})
export class Canalmonitoreadocomponent {
  constructor(public route: ActivatedRoute) {}
}
