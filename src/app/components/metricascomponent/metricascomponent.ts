import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-metricascomponent',
  imports: [RouterOutlet],
  templateUrl: './metricascomponent.html',
  styleUrl: './metricascomponent.css',
})
export class Metricascomponent {
  constructor(public route: ActivatedRoute) {}
}
