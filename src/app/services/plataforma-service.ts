import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Plataforma } from '../models/Plataforma';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PlataformaService {
  private url = `${base_url}/plataformas`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Plataforma[]>(`${this.url}/lista`);
  }
  insert(c: Plataforma) {
    return this.http.post(`${this.url}/nuevo`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Plataforma) {
    return this.http.put(`${this.url}/actualiza`, c, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Plataforma>(`${this.url}/${id}`);
  }
}
