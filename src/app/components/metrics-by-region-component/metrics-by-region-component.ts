import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReportService } from '../../services/report-service';
import { MetricsByRegionDTO } from '../../models/MetricsByRegionDTO';

const PALETTE = [
  { bg: 'rgba(52, 152, 219, 0.3)',  border: '#3498db' },
  { bg: 'rgba(46, 204, 113, 0.3)',  border: '#2ecc71' },
  { bg: 'rgba(231, 76,  60,  0.3)', border: '#e74c3c' },
  { bg: 'rgba(243, 156,  18, 0.3)', border: '#f39c12' },
  { bg: 'rgba(155, 89, 182,  0.3)', border: '#9b59b6' },
  { bg: 'rgba(26, 188, 156,  0.3)', border: '#1abc9c' },
  { bg: 'rgba(230, 126,  34, 0.3)', border: '#e67e22' },
  { bg: 'rgba(52,  73,  94,  0.3)', border: '#34495e' },
];

@Component({
  selector: 'app-metrics-by-region',
  imports: [BaseChartDirective, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './metrics-by-region-component.html',
  styleUrl: './metrics-by-region-component.css',
})
export class MetricsByRegion implements OnInit {
  hasData = false;
  loading = true;

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 8 },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
        labels: {
          padding: 14,
          boxWidth: 10,
          boxHeight: 10,
          font: { size: 12 },
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${Number(ctx.parsed.y).toLocaleString()}`,
        },
      },
    },
    scales: {
      x: { ticks: { color: '#2c3e50', font: { size: 12 } }, grid: { display: false } },
      y: {
        ticks: { color: '#888', callback: (v) => Number(v).toLocaleString() },
        grid: { color: 'rgba(0,0,0,0.06)' },
      },
    },
  };
  chartLegend = true;
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];
  chartType: ChartType = 'bar';

  constructor(private rS: ReportService) {}

  ngOnInit(): void {
    this.rS.getMetricsByRegion().subscribe({
      next: (data: MetricsByRegionDTO[]) => {
        if (data && data.length > 0) {
          this.hasData = true;
          const regions = [...new Set(data.map((d) => d.regionName))];
          const metrics = [...new Set(data.map((d) => d.metricName))];

          this.chartLabels = regions;
          this.chartData = metrics.map((metric, i) => {
            const color = PALETTE[i % PALETTE.length];
            const values = regions.map((region) => {
              const found = data.find(
                (d) => d.regionName === region && d.metricName === metric
              );
              return found ? Math.round(found.averageAmount) : 0;
            });
            return {
              data: values,
              label: metric,
              backgroundColor: color.bg,
              borderColor: color.border,
              pointBackgroundColor: color.border,
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: color.border,
            };
          });
        } else {
          this.hasData = false;
        }
        this.loading = false;
      },
      error: () => {
        this.hasData = false;
        this.loading = false;
      },
    });
  }
}
