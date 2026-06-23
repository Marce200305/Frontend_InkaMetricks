import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TransmisionListar } from './transmision-listar/transmision-listar';

@Component({
  selector: 'app-transmision-component',
  imports: [RouterOutlet, TransmisionListar],
  templateUrl: './transmision-component.html',
  styleUrl: './transmision-component.css',
})
export class TransmisionComponent {
  constructor(public route: ActivatedRoute) {}
}
