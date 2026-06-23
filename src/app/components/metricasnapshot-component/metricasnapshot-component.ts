import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MetricasnapshotListar } from './metricasnapshot-listar/metricasnapshot-listar';

@Component({
  selector: 'app-metricasnapshot-component',
  imports: [
    RouterOutlet,
    MetricasnapshotListar
  ],
  templateUrl: './metricasnapshot-component.html',
  styleUrl: './metricasnapshot-component.css',
})
export class MetricasnapshotComponent {
  constructor(public route:ActivatedRoute) {}
}
