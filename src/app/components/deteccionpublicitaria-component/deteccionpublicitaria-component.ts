import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DeteccionpublicitariaListar } from './deteccionpublicitaria-listar/deteccionpublicitaria-listar';

@Component({
  selector: 'app-deteccionpublicitaria-component',
  imports: [RouterOutlet, DeteccionpublicitariaListar],
  templateUrl: './deteccionpublicitaria-component.html',
  styleUrl: './deteccionpublicitaria-component.css',
})
export class DeteccionpublicitariaComponent {
  constructor(public route: ActivatedRoute) {}
}
