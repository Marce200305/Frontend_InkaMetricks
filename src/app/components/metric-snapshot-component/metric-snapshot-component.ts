import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MetricSnapshotList } from './metric-snapshot-list/metric-snapshot-list';

@Component({
  selector: 'app-metric-snapshot-component',
  imports: [RouterOutlet, MetricSnapshotList],
  templateUrl: './metric-snapshot-component.html',
  styleUrl: './metric-snapshot-component.css',
})
export class MetricSnapshotComponent {
  constructor(public route: ActivatedRoute) {}
}
