import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RegionList } from './region-list/region-list';

@Component({
  selector: 'app-regioncomponent',
  imports: [RouterOutlet, RegionList],
  templateUrl: './regioncomponent.html',
  styleUrl: './regioncomponent.css',
})
export class Regioncomponent {
  constructor(public route: ActivatedRoute) {}
}
