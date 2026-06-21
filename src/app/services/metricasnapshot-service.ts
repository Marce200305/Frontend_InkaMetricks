import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { MetricaSnapshot } from '../models/MetricaSnapshot';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class MetricasnapshotService {
    private url = `${base_url}/metricasSnapshots`;
    constructor(private http: HttpClient) { }

  list() {
    return this.http.get<MetricaSnapshot[]>(`${this.url}/lista`);
  }
  insert(c: MetricaSnapshot) {
    return this.http.post(`${this.url}/nuevo`, c);
  }
  update(c: MetricaSnapshot) {
    return this.http.put(`${this.url}/actualiza-metrica`, c, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<MetricaSnapshot>(`${this.url}/${id}`);
  }

}
