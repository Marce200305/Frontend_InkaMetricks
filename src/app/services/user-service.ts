import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${base_url}/users`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<User[]>(`${this.url}/list`);
  }
  insert(c: User) {
    return this.http.post(`${this.url}/new`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: User) {
    return this.http.put(`${this.url}/update`, c, { responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<User>(`${this.url}/${id}`);
  }
}
