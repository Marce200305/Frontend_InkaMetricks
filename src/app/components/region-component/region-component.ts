import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RegionListar } from './region-listar/region-listar';

@Component({
  selector: 'app-region-component',
  imports: [RouterOutlet, RegionListar],
  templateUrl: './region-component.html',
  styleUrl: './region-component.css',
})
export class RegionComponent {
  constructor(public route: ActivatedRoute) {}
}
