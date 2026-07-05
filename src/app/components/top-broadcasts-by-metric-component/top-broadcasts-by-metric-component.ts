import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReportService } from '../../services/report-service';
import { MetricsByBroadcastDTO } from '../../models/MetricsByBroadcastDTO';

@Component({
  selector: 'app-top-broadcasts-by-metric',
  imports: [BaseChartDirective, MatIconModule, MatProgressSpinnerModule, FormsModule],
  templateUrl: './top-broadcasts-by-metric-component.html',
  styleUrl: './top-broadcasts-by-metric-component.css',
})
export class TopBroadcastsByMetric implements OnInit {
  hasData = false;
  loading = true;
  metricName = '';
  availableNames: string[] = [];

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { padding: 20, font: { size: 13 } } },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.parsed.toLocaleString()}`,
        },
      },
    },
  };
  chartLegend = true;
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];
  chartType: ChartType = 'doughnut';

  private readonly COLORS = [
    '#3498db', '#e74c3c', '#2ecc71', '#f39c12',
    '#9b59b6', '#1abc9c', '#e67e22', '#e91e63',
  ];

  constructor(private rS: ReportService) {}

  ngOnInit(): void {
    this.rS.getMetricNames().subscribe({
      next: (names) => {
        this.availableNames = names;
        if (names.length > 0) {
          this.metricName = names[0];
          this.loadData();
        } else {
          this.loading = false;
        }
      },
      error: () => { this.loading = false; },
    });
  }

  loadData(): void {
    this.loading = true;
    this.rS.getTopBroadcastsByMetric(this.metricName).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.hasData = true;
          this.chartLabels = data.map((item: MetricsByBroadcastDTO) => item.streamTitle);
          this.chartData = [
            {
              data: data.map((item: MetricsByBroadcastDTO) => item.totalAmount),
              label: `Total "${this.metricName}" per broadcast`,
              backgroundColor: this.COLORS.slice(0, data.length),
              hoverOffset: 10,
            },
          ];
        } else {
          this.hasData = false;
        }
        this.loading = false;
      },
      error: () => { this.hasData = false; this.loading = false; },
    });
  }
}
