import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/Users';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = `${base_url}/usuarios`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Users[]>(`${this.url}/lista`);
  }
  insert(c: Users) {
    return this.http.post(`${this.url}/nuevo`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Users) {
    return this.http.put(`${this.url}/actualiza`, c, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Users>(`${this.url}/${id}`);
  }
}
