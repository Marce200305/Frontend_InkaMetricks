import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BrandList } from './brand-list/brand-list';

@Component({
  selector: 'app-brand-component',
  imports: [RouterOutlet, BrandList],
  templateUrl: './brand-component.html',
  styleUrl: './brand-component.css',
})
export class BrandComponent {
  constructor(public route: ActivatedRoute) {}
}
