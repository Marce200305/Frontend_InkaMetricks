import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Platform } from '../models/Platform';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private url = `${base_url}/platforms`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Platform[]>(`${this.url}/list`);
  }
  insert(c: Platform) {
    return this.http.post(`${this.url}/new`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Platform) {
    return this.http.put(`${this.url}/update`, c, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Platform>(`${this.url}/${id}`);
  }
}
