import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../models/Empresa';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  
  private url = `${base_url}/empresas`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Empresa[]>(`${this.url}/lista`);
  }
  insert(c: Empresa) {
    return this.http.post(`${this.url}/nuevo`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Empresa){
    return this.http.put(`${this.url}/actualiza`,c,{ responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Empresa>(`${this.url}/${id}`);
  }
}
