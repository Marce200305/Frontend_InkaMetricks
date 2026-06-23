import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Plan } from '../models/Plan';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private url = `${base_url}/planes`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Plan[]>(`${this.url}/lista`);
  }
  insert(c: Plan) {
    return this.http.post(`${this.url}/nuevo`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Plan){
    return this.http.put(`${this.url}/actualiza`,c,{ responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Plan>(`${this.url}/${id}`);
  }
}
