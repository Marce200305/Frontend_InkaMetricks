import { Component } from '@angular/core';
import {ActivatedRoute,RouterOutlet} from '@angular/router';
import { DeteccionpublicitariaList } from './deteccionpublicitaria-list/deteccionpublicitaria-list';

@Component({
  selector: 'app-deteccionpublicitariacomponent',
  imports: [RouterOutlet, DeteccionpublicitariaList],
  templateUrl: './deteccionpublicitariacomponent.html',
  styleUrl: './deteccionpublicitariacomponent.css',
})
export class Deteccionpublicitariacomponent {
  constructor(public route: ActivatedRoute) {}
}
