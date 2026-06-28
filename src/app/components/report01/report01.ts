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
  nombreMetrica = '';
  nombresDisponibles: string[] = [];

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

  constructor(private rS: ReporteService) {}

  ngOnInit(): void {
    this.rS.getNombresMetrica().subscribe({
      next: (nombres) => {
        this.nombresDisponibles = nombres;
        if (nombres.length > 0) {
          this.nombreMetrica = nombres[0];
          this.cargarDatos();
        }
      },
    });
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
              backgroundColor: this.COLORS.slice(0, data.length),
              hoverOffset: 10,
            },
          ];
        } else {
          this.hasData = false;
        }
      },
      error: () => { this.hasData = false; },
    });
  }
}
