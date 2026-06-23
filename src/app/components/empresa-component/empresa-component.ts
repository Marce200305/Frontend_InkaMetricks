import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { EmpresaListar } from './empresa-listar/empresa-listar';

@Component({
  selector: 'app-empresa-component',
  imports: [RouterOutlet, EmpresaListar],
  templateUrl: './empresa-component.html',
  styleUrl: './empresa-component.css',
})
export class EmpresaComponent {
  constructor(public route: ActivatedRoute) {}
}
