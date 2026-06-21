import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { DeteccionPublicitaria } from '../models/DeteccionPublicitaria';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class DeteccionpublicitariaService {
  private url = `${base_url}/deteccionesPublicitarias`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<DeteccionPublicitaria[]>(`${this.url}/lista`);
  }
  insert(c: DeteccionPublicitaria) {
    return this.http.post(`${this.url}/nuevo`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: DeteccionPublicitaria){
    return this.http.put(`${this.url}/actualiza`,c,{ responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<DeteccionPublicitaria>(`${this.url}/${id}`);
  }
}
