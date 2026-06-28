import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { ReporteService } from '../../services/reporte-service';

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
  selector: 'app-report02',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './report02.html',
  styleUrl: './report02.css',
})
export class Report02 implements OnInit {
  hasData = false;

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { padding: 20, font: { size: 13 }, usePointStyle: true } },
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

  constructor(private rS: ReporteService) {}

  ngOnInit(): void {
    this.rS.getMetricasPorRegion().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.hasData = true;
          const regiones = [...new Set(data.map((d) => d.nombreRegion))];
          const metricas = [...new Set(data.map((d) => d.nombreMetrica))];

          this.chartLabels = regiones;
          this.chartData = metricas.map((metrica, i) => {
            const color = PALETTE[i % PALETTE.length];
            const valores = regiones.map((region) => {
              const found = data.find(
                (d) => d.nombreRegion === region && d.nombreMetrica === metrica
              );
              return found ? Math.round(found.promedioCantidad) : 0;
            });
            return {
              data: valores,
              label: metrica,
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
      },
      error: () => {
        this.hasData = false;
      },
    });
  }
}
