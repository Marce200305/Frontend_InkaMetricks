import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MarcaListar } from './marca-listar/marca-listar';

@Component({
  selector: 'app-marca-component',
  imports: [RouterOutlet, MarcaListar],
  templateUrl: './marca-component.html',
  styleUrl: './marca-component.css',
})
export class MarcaComponent {
  constructor(public route: ActivatedRoute) {}
}
