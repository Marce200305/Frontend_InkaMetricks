import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../models/Brand';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class BrandService {

  private url = `${base_url}/brands`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Brand[]>(`${this.url}/list`);
  }
  insert(c: Brand) {
    return this.http.post(`${this.url}/new`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Brand){
    return this.http.put(`${this.url}/update`,c,{ responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Brand>(`${this.url}/${id}`);
  }
}
