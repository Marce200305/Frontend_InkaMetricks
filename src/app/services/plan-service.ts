import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Plan } from '../models/Plan';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private url = `${base_url}/plans`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Plan[]>(`${this.url}/list`);
  }
  insert(c: Plan) {
    return this.http.post(`${this.url}/new`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Plan){
    return this.http.put(`${this.url}/update`,c,{ responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Plan>(`${this.url}/${id}`);
  }
  // metodo agregado
  listHigherPrice() {
    return this.http.get<Plan[]>(`${this.url}/higher-price`);
  }
}
