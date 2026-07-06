import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Region } from '../models/Region';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private url = `${base_url}/regions`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Region[]>(`${this.url}/list`);
  }
  insert(c: Region) {
    return this.http.post(`${this.url}/new`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Region) {
    return this.http.put(`${this.url}/update`, c, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Region>(`${this.url}/${id}`);
  }
}
