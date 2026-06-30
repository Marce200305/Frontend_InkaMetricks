import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MetricasList } from './metricas-list/metricas-list';

@Component({
  selector: 'app-metricascomponent',
  imports: [
    RouterOutlet,
    MetricasList
  ],
  templateUrl: './metricascomponent.html',
  styleUrl: './metricascomponent.css',
})
export class Metricascomponent {
  constructor(public route:ActivatedRoute) {}
}
