import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MetricSnapshot } from '../models/MetricSnapshot';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class MetricSnapshotService {
    private url = `${base_url}/metrics`;
    constructor(private http: HttpClient) { }

  list() {
    return this.http.get<MetricSnapshot[]>(`${this.url}/list`);
  }
  insert(c: MetricSnapshot) {
    return this.http.post(`${this.url}/new`, c);
  }
  update(c: MetricSnapshot) {
    return this.http.put(`${this.url}/update`, c, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<MetricSnapshot>(`${this.url}/${id}`);
  }

}
