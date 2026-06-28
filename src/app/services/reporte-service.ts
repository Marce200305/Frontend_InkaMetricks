import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';
import { MetricasPorTransmisionDTO } from '../models/MetricasPorTransmisionDTO';
import { MetricasPorRegionDTO } from '../models/MetricasPorRegionDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  private url = `${base_url}/metricasSnapshots`;

  private nombresMetrica$: Observable<string[]> | null = null;
  private metricasPorRegion$: Observable<MetricasPorRegionDTO[]> | null = null;
  private topTransmisiones$: Map<string, Observable<MetricasPorTransmisionDTO[]>> = new Map();

  constructor(private http: HttpClient) {}

  getNombresMetrica(): Observable<string[]> {
    if (!this.nombresMetrica$) {
      this.nombresMetrica$ = this.http
        .get<string[]>(`${this.url}/nombres-metrica`)
        .pipe(shareReplay(1));
    }
    return this.nombresMetrica$;
  }

  getTopTransmisionesPorMetrica(nombreMetrica: string): Observable<MetricasPorTransmisionDTO[]> {
    if (!this.topTransmisiones$.has(nombreMetrica)) {
      const obs$ = this.http
        .get<MetricasPorTransmisionDTO[]>(
          `${this.url}/reporte-top-transmisiones?nombreMetrica=${nombreMetrica}`
        )
        .pipe(shareReplay(1));
      this.topTransmisiones$.set(nombreMetrica, obs$);
    }
    return this.topTransmisiones$.get(nombreMetrica)!;
  }

  getMetricasPorRegion(): Observable<MetricasPorRegionDTO[]> {
    if (!this.metricasPorRegion$) {
      this.metricasPorRegion$ = this.http
        .get<MetricasPorRegionDTO[]>(`${this.url}/reporte-metricas-por-region`)
        .pipe(shareReplay(1));
    }
    return this.metricasPorRegion$;
  }
}
