import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TransmisionList } from './transmision-list/transmision-list';

@Component({
  selector: 'app-transmisioncomponent',
  imports: [
    RouterOutlet,
    TransmisionList
  ],
  templateUrl: './transmisioncomponent.html',
  styleUrl: './transmisioncomponent.css',
})
export class Transmisioncomponent {
  constructor(public route: ActivatedRoute) {}
}
