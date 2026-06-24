import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MetricasPorTransmisionDTO } from '../models/MetricasPorTransmisionDTO';
import { MetricasPorRegionDTO } from '../models/MetricasPorRegionDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  private url = `${base_url}/metricasSnapshots`;

  constructor(private http: HttpClient) {}

  getTopTransmisionesPorMetrica(nombreMetrica: string) {
    return this.http.get<MetricasPorTransmisionDTO[]>(
      `${this.url}/reporte-top-transmisiones?nombreMetrica=${nombreMetrica}`
    );
  }

  getMetricasPorRegion() {
    return this.http.get<MetricasPorRegionDTO[]>(
      `${this.url}/reporte-metricas-por-region`
    );
  }
}
