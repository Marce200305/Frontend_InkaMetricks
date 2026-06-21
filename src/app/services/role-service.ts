import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/Role';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private url = `${base_url}/roles`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Role[]>(`${this.url}/lista`);
  }
  insert(c: Role) {
    return this.http.post(`${this.url}/nuevo`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Role) {
    return this.http.put(`${this.url}/actualiza`, c, { responseType: 'text' });
  }
}
