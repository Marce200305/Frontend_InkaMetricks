import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Canal } from '../models/Canal';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CanalService {
  
  private url = `${base_url}/canales`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Canal[]>(`${this.url}/lista`);
  }
  insert(c: Canal) {
    return this.http.post(`${this.url}/nuevo`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Canal){
    return this.http.put(`${this.url}/actualiza`,c,{ responseType: 'text' });
  }
    listId(id: number) {
    return this.http.get<Canal>(`${this.url}/${id}`);
  }
}




