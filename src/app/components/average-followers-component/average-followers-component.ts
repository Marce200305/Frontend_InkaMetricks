import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReportService } from '../../services/report-service';
import { AverageFollowersDTO } from '../../models/AverageFollowersDTO';

@Component({
  selector: 'app-average-followers',
  imports: [BaseChartDirective, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './average-followers-component.html',
  styleUrl: './average-followers-component.css',
})
export class AverageFollowers implements OnInit {
  hasData = false;
  loading = true;

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 8 },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` Promedio: ${Number(ctx.parsed.y).toLocaleString()}`,
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
  chartLegend = false;
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];
  chartType: ChartType = 'line';

  constructor(private rS: ReportService) {}

  ngOnInit(): void {
    this.rS.getAverageFollowersByPlatform().subscribe({
      next: (data: AverageFollowersDTO[]) => {
        if (data && data.length > 0) {
          this.hasData = true;
          this.chartLabels = data.map((d) => d.platform);
          this.chartData = [
            {
              data: data.map((d) => Math.round(d.followersAverage)),
              label: 'Promedio de seguidores',
              backgroundColor: 'rgba(52, 152, 219, 0.3)',
              borderColor: '#3498db',
              tension: 0.3,
              fill: true,
              pointBackgroundColor: '#3498db',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#3498db',
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
