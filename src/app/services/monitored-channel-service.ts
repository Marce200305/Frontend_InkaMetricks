import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MonitoredChannel } from '../models/MonitoredChannel';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class MonitoredChannelService {
  private url = `${base_url}/monitored-channels`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<MonitoredChannel[]>(`${this.url}/list`);
  }
  insert(c: MonitoredChannel) {
    return this.http.post(`${this.url}/new`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: MonitoredChannel){
    return this.http.put(`${this.url}/update`,c,{ responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<MonitoredChannel>(`${this.url}/${id}`);
  }
}
