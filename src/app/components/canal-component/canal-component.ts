import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CanalListar } from './canal-listar/canal-listar';

@Component({
  selector: 'app-canal-component',
  imports: [RouterOutlet, CanalListar],
  templateUrl: './canal-component.html',
  styleUrl: './canal-component.css',
})
export class CanalComponent {
  constructor(public route: ActivatedRoute) {}
}
