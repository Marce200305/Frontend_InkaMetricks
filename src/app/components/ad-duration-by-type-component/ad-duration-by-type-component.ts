import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReportService } from '../../services/report-service';
import { AdDurationByTypeDTO } from '../../models/AdDurationByTypeDTO';

@Component({
  selector: 'app-ad-duration-by-type',
  imports: [BaseChartDirective, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './ad-duration-by-type-component.html',
  styleUrl: './ad-duration-by-type-component.css',
})
export class AdDurationByType implements OnInit {
  hasData = false;
  loading = true;

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { padding: 20, font: { size: 13 } } },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.parsed.toLocaleString()} seg`,
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
    this.rS.getAdDurationByType().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.hasData = true;
          this.chartLabels = data.map((item: AdDurationByTypeDTO) => item.type);
          this.chartData = [
            {
              data: data.map((item: AdDurationByTypeDTO) => item.totalDurationSec),
              label: 'Duración total (seg)',
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
