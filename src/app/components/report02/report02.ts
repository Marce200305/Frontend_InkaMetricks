import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { ReporteService } from '../../services/reporte-service';

@Component({
  selector: 'app-report02',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './report02.html',
  styleUrl: './report02.css',
})
export class Report02 implements OnInit {
  hasData = false;

  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];
  chartType: ChartType = 'radar';

  constructor(private rS: ReporteService) {}

  ngOnInit(): void {
    this.rS.getMetricasPorRegion().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.hasData = true;
          this.chartLabels = data.map((item) => `${item.nombreRegion} - ${item.nombreMetrica}`);
          this.chartData = [
            {
              data: data.map((item) => item.promedioCantidad),
              label: 'Promedio de métrica por región',
              backgroundColor: 'rgba(211, 47, 47, 0.3)',
              borderColor: '#d32f2f',
              pointBackgroundColor: '#d32f2f',
            },
          ];
        } else {
          this.hasData = false;
        }
      },
      error: () => {
        this.hasData = false;
      },
    });
  }
}
