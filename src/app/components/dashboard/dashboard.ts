import { Component } from '@angular/core';
import { TopBroadcastsByMetric } from '../top-broadcasts-by-metric-component/top-broadcasts-by-metric-component';
import { MetricsByRegion } from '../metrics-by-region-component/metrics-by-region-component';
import { AdDurationByType } from '../ad-duration-by-type-component/ad-duration-by-type-component';
import { StreamerEfficiency } from '../streamer-efficiency-component/streamer-efficiency-component';
import { ChannelsByPlatform } from '../channels-by-platform-component/channels-by-platform-component';
import { AverageFollowers } from '../average-followers-component/average-followers-component';

@Component({
  selector: 'app-dashboard',
  imports: [TopBroadcastsByMetric, MetricsByRegion, AdDurationByType, StreamerEfficiency, ChannelsByPlatform, AverageFollowers],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {}
