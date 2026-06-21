import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Transmision } from '../models/Transmision';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class TransmisionService {
  private url = `${base_url}/transmisiones`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Transmision[]>(`${this.url}/lista`);
  }
  insert(c: Transmision) {
    return this.http.post(`${this.url}/nuevo`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Transmision) {
    return this.http.put(`${this.url}/actualiza`, c, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Transmision>(`${this.url}/${id}`);
  }
}
