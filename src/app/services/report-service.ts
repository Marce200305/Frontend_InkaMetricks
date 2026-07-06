import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';
import { MetricsByBroadcastDTO } from '../models/MetricsByBroadcastDTO';
import { MetricsByRegionDTO } from '../models/MetricsByRegionDTO';
import { AdDurationByTypeDTO } from '../models/AdDurationByTypeDTO';
import { StreamerEfficiencyDTO } from '../models/StreamerEfficiencyDTO';
import { ChannelsByPlatformDTO } from '../models/ChannelsByPlatformDTO';
import { AverageFollowersDTO } from '../models/AverageFollowersDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private url = `${base_url}/metrics`;
  private adUrl = `${base_url}/ad-detections`;
  private channelUrl = `${base_url}/channels`;

  private metricNames$: Observable<string[]> | null = null;
  private metricsByRegion$: Observable<MetricsByRegionDTO[]> | null = null;
  private topBroadcasts$: Map<string, Observable<MetricsByBroadcastDTO[]>> = new Map();
  private adDurationByType$: Observable<AdDurationByTypeDTO[]> | null = null;
  private streamerEfficiency$: Observable<StreamerEfficiencyDTO[]> | null = null;
  private channelsByPlatform$: Observable<ChannelsByPlatformDTO[]> | null = null;
  private averageFollowers$: Observable<AverageFollowersDTO[]> | null = null;

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

  getAdDurationByType(): Observable<AdDurationByTypeDTO[]> {
    if (!this.adDurationByType$) {
      this.adDurationByType$ = this.http
        .get<AdDurationByTypeDTO[]>(`${this.adUrl}/sum-by-type`)
        .pipe(shareReplay(1));
    }
    return this.adDurationByType$;
  }

  getStreamerEfficiency(): Observable<StreamerEfficiencyDTO[]> {
    if (!this.streamerEfficiency$) {
      this.streamerEfficiency$ = this.http
        .get<StreamerEfficiencyDTO[]>(`${this.adUrl}/streamer-efficiency`)
        .pipe(shareReplay(1));
    }
    return this.streamerEfficiency$;
  }

  getChannelsByPlatform(): Observable<ChannelsByPlatformDTO[]> {
    if (!this.channelsByPlatform$) {
      this.channelsByPlatform$ = this.http
        .get<ChannelsByPlatformDTO[]>(`${this.channelUrl}/channels-by-platform`)
        .pipe(shareReplay(1));
    }
    return this.channelsByPlatform$;
  }

  getAverageFollowersByPlatform(): Observable<AverageFollowersDTO[]> {
    if (!this.averageFollowers$) {
      this.averageFollowers$ = this.http
        .get<AverageFollowersDTO[]>(`${this.channelUrl}/average-followers`)
        .pipe(shareReplay(1));
    }
    return this.averageFollowers$;
  }
}
