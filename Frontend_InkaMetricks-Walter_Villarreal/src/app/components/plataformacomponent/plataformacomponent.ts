import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PlataformaList } from './plataforma-list/plataforma-list';

@Component({
  selector: 'app-plataformacomponent',
  imports: [RouterOutlet, PlataformaList],
  templateUrl: './plataformacomponent.html',
  styleUrl: './plataformacomponent.css',
})
export class Plataformacomponent {
  constructor(public route: ActivatedRoute){}
}
