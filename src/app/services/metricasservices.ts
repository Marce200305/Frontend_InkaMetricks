import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MetricaSnapshot } from '../models/MetricaSnapshot';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Metricasservices {

  private url = `${base_url}/metricasSnapshots`;

    constructor(private http: HttpClient) { }

  list() {
    return this.http.get<MetricaSnapshot[]>(`${this.url}/lista-metricas`);
  }

  insert(c: MetricaSnapshot) {
    return this.http.post(`${this.url}/nueva-metrica`, c);
  }
  listId(id: number) {
    return this.http.get<MetricaSnapshot>(`${this.url}/${id}`);
  }
  update(c: MetricaSnapshot) {
    return this.http.put(`${this.url}/actualiza-metrica`, c, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }


}
