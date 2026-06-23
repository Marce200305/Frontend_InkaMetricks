import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PlataformaListar } from './plataforma-listar/plataforma-listar';

@Component({
  selector: 'app-plataforma-component',
  imports: [RouterOutlet, PlataformaListar],
  templateUrl: './plataforma-component.html',
  styleUrl: './plataforma-component.css',
})
export class PlataformaComponent {
  constructor(public route: ActivatedRoute) {}
}
