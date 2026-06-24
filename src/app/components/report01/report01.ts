import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { ReporteService } from '../../services/reporte-service';

@Component({
  selector: 'app-report01',
  imports: [BaseChartDirective, MatIconModule, FormsModule],
  templateUrl: './report01.html',
  styleUrl: './report01.css',
})
export class Report01 implements OnInit {
  hasData = false;
  nombreMetrica = 'views';

  chartOptions: ChartOptions = { responsive: true };
  chartLegend = true;
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];
  chartType: ChartType = 'doughnut';

  constructor(private rS: ReporteService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.rS.getTopTransmisionesPorMetrica(this.nombreMetrica).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.hasData = true;
          this.chartLabels = data.map((item) => item.tituloStream);
          this.chartData = [
            {
              data: data.map((item) => item.totalCantidad),
              label: `Total de "${this.nombreMetrica}" por transmisión`,
              backgroundColor: [
                '#d72b04',
                '#f40b03',
                'rgb(194, 41, 31)',
                'rgba(230, 77, 77, 0.7)',
                'rgb(148, 14, 4)',
                '#ff6b6b',
                '#c0392b',
                '#e74c3c',
              ],
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
