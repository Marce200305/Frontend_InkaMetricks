import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CanalmonitoreadoListar } from './canalmonitoreado-listar/canalmonitoreado-listar';

@Component({
  selector: 'app-canalmonitoreado-component',
  imports: [RouterOutlet, CanalmonitoreadoListar],
  templateUrl: './canalmonitoreado-component.html',
  styleUrl: './canalmonitoreado-component.css',
})
export class CanalmonitoreadoComponent {
  constructor(public route: ActivatedRoute) {}
}
