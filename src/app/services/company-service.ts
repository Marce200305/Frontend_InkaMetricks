import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/Company';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CompanyService {

  private url = `${base_url}/companies`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Company[]>(`${this.url}/list`);
  }
  insert(c: Company) {
    return this.http.post(`${this.url}/new`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Company){
    return this.http.put(`${this.url}/update`,c,{ responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Company>(`${this.url}/${id}`);
  }

  // 👇 AQUÍ ESTÁ EL MÉTODO QUE FALTABA 👇
  buscarPorPlan(idPlan: number) {
    return this.http.get<Company[]>(`${this.url}/buscar-por-plan?idPlan=${idPlan}`);
  }
}