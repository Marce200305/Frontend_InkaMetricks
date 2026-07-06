import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PlatformList } from './platform-list/platform-list';

@Component({
  selector: 'app-platform-component',
  imports: [RouterOutlet, PlatformList],
  templateUrl: './platform-component.html',
  styleUrl: './platform-component.css',
})
export class PlatformComponent {
  constructor(public route: ActivatedRoute) {}
}
