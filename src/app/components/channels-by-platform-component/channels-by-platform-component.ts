import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReportService } from '../../services/report-service';
import { ChannelsByPlatformDTO } from '../../models/ChannelsByPlatformDTO';

@Component({
  selector: 'app-channels-by-platform',
  imports: [BaseChartDirective, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './channels-by-platform-component.html',
  styleUrl: './channels-by-platform-component.css',
})
export class ChannelsByPlatform implements OnInit {
  hasData = false;
  loading = true;

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { padding: 20, font: { size: 13 } } },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.parsed.toLocaleString()} canales`,
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
    this.rS.getChannelsByPlatform().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.hasData = true;
          this.chartLabels = data.map((item: ChannelsByPlatformDTO) => item.platform);
          this.chartData = [
            {
              data: data.map((item: ChannelsByPlatformDTO) => item.channelsQuantity),
              label: 'Cantidad de canales',
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
