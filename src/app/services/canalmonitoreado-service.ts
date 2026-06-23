import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CanalMonitoreado } from '../models/CanalMonitoreado';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class CanalmonitoreadoService {
  private url = `${base_url}/canalesMonitoreados`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<CanalMonitoreado[]>(`${this.url}/lista`);
  }
  insert(c: CanalMonitoreado) {
    return this.http.post(`${this.url}/nuevo`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: CanalMonitoreado){
    return this.http.put(`${this.url}/actualiza`,c,{ responseType: 'text' });
  }
    listId(id: number) {
    return this.http.get<CanalMonitoreado>(`${this.url}/${id}`);
  } 
}
