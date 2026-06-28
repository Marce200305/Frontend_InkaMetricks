import { Component } from '@angular/core';
import { TopBroadcastsByMetric } from '../top-broadcasts-by-metric-component/top-broadcasts-by-metric-component';
import { MetricsByRegion } from '../metrics-by-region-component/metrics-by-region-component';

@Component({
  selector: 'app-dashboard',
  imports: [TopBroadcastsByMetric, MetricsByRegion],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {}
