import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../models/Marca';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  
  private url = `${base_url}/marcas`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Marca[]>(`${this.url}/lista`);
  }
  insert(c: Marca) {
    return this.http.post(`${this.url}/nuevo`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Marca){
    return this.http.put(`${this.url}/actualiza`,c,{ responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Marca>(`${this.url}/${id}`);
  }
}
