import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Streamer } from '../models/Streamer';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class StreamerService {
  private url = `${base_url}/streamers`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Streamer[]>(`${this.url}/lista`);
  }
  insert(c: Streamer) {
    return this.http.post(`${this.url}/nuevo`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Streamer) {
    return this.http.put(`${this.url}/actualiza`, c, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Streamer>(`${this.url}/${id}`);
  }
}
