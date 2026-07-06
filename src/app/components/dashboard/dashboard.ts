import { Component } from '@angular/core';
import { TopBroadcastsByMetric } from '../top-broadcasts-by-metric-component/top-broadcasts-by-metric-component';
import { MetricsByRegion } from '../metrics-by-region-component/metrics-by-region-component';
import { AdDurationByType } from '../ad-duration-by-type-component/ad-duration-by-type-component';
import { StreamerEfficiency } from '../streamer-efficiency-component/streamer-efficiency-component';

@Component({
  selector: 'app-dashboard',
  imports: [TopBroadcastsByMetric, MetricsByRegion, AdDurationByType, StreamerEfficiency],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {}
