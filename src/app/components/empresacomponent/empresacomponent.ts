import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { EmpresaList } from './empresa-list/empresa-list';

@Component({
  selector: 'app-empresacomponent',
  imports: [RouterOutlet, EmpresaList],
  templateUrl: './empresacomponent.html',
  styleUrl: './empresacomponent.css',
})
export class Empresacomponent {
  constructor(public route: ActivatedRoute) {}
}
