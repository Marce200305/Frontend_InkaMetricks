import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MarcaList } from './marca-list/marca-list';

@Component({
  selector: 'app-marcacomponent',
  imports: [RouterOutlet, MarcaList],
  templateUrl: './marcacomponent.html',
  styleUrl: './marcacomponent.css',
})
export class Marcacomponent {
  constructor(public route: ActivatedRoute) {}
}
