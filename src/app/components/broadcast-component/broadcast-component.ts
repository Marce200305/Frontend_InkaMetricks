import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BroadcastList } from './broadcast-list/broadcast-list';

@Component({
  selector: 'app-broadcast-component',
  imports: [RouterOutlet, BroadcastList],
  templateUrl: './broadcast-component.html',
  styleUrl: './broadcast-component.css',
})
export class BroadcastComponent {
  constructor(public route: ActivatedRoute) {}
}
