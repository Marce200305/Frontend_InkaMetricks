import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';
import { MetricsByBroadcastDTO } from '../models/MetricsByBroadcastDTO';
import { MetricsByRegionDTO } from '../models/MetricsByRegionDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private url = `${base_url}/metrics`;

  private metricNames$: Observable<string[]> | null = null;
  private metricsByRegion$: Observable<MetricsByRegionDTO[]> | null = null;
  private topBroadcasts$: Map<string, Observable<MetricsByBroadcastDTO[]>> = new Map();

  constructor(private http: HttpClient) {}

  getMetricNames(): Observable<string[]> {
    if (!this.metricNames$) {
      this.metricNames$ = this.http
        .get<string[]>(`${this.url}/metric-names`)
        .pipe(shareReplay(1));
    }
    return this.metricNames$;
  }

  getTopBroadcastsByMetric(metricName: string): Observable<MetricsByBroadcastDTO[]> {
    if (!this.topBroadcasts$.has(metricName)) {
      const obs$ = this.http
        .get<MetricsByBroadcastDTO[]>(
          `${this.url}/reporte-top-transmisiones?metricName=${metricName}`
        )
        .pipe(shareReplay(1));
      this.topBroadcasts$.set(metricName, obs$);
    }
    return this.topBroadcasts$.get(metricName)!;
  }

  getMetricsByRegion(): Observable<MetricsByRegionDTO[]> {
    if (!this.metricsByRegion$) {
      this.metricsByRegion$ = this.http
        .get<MetricsByRegionDTO[]>(`${this.url}/reporte-metricas-por-region`)
        .pipe(shareReplay(1));
    }
    return this.metricsByRegion$;
  }
}
