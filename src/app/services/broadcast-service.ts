import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Broadcast } from '../models/Broadcast';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  private url = `${base_url}/broadcasts`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Broadcast[]>(`${this.url}/list`);
  }
  insert(c: Broadcast) {
    return this.http.post(`${this.url}/new`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Broadcast) {
    return this.http.put(`${this.url}/update`, c, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Broadcast>(`${this.url}/${id}`);
  }
}
