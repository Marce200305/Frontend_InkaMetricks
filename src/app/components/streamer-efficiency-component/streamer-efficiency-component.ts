import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReportService } from '../../services/report-service';
import { StreamerEfficiencyDTO } from '../../models/StreamerEfficiencyDTO';

@Component({
  selector: 'app-streamer-efficiency',
  imports: [BaseChartDirective, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './streamer-efficiency-component.html',
  styleUrl: './streamer-efficiency-component.css',
})
export class StreamerEfficiency implements OnInit {
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
          label: (ctx) => ` Eficiencia: ${Number(ctx.parsed.y).toFixed(4)}`,
        },
      },
    },
    scales: {
      x: { ticks: { color: '#2c3e50', font: { size: 12 } }, grid: { display: false } },
      y: {
        ticks: { color: '#888', callback: (v) => Number(v).toFixed(4) },
        grid: { color: 'rgba(0,0,0,0.06)' },
      },
    },
  };
  chartLegend = false;
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];
  chartType: ChartType = 'bar';

  constructor(private rS: ReportService) {}

  ngOnInit(): void {
    this.rS.getStreamerEfficiency().subscribe({
      next: (data: StreamerEfficiencyDTO[]) => {
        if (data && data.length > 0) {
          this.hasData = true;
          this.chartLabels = data.map((d) => d.streamerName);
          this.chartData = [
            {
              data: data.map((d) => Math.round(d.efficiencyRatio * 10000) / 10000),
              label: 'Eficiencia',
              backgroundColor: 'rgba(52, 152, 219, 0.3)',
              borderColor: '#3498db',
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
