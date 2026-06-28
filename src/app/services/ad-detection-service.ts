import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AdDetection } from '../models/AdDetection';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class AdDetectionService {
  private url = `${base_url}/ad-detections`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<AdDetection[]>(`${this.url}/list`);
  }
  insert(c: AdDetection) {
    return this.http.post(`${this.url}/new`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: AdDetection){
    return this.http.put(`${this.url}/update`,c,{ responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<AdDetection>(`${this.url}/${id}`);
  }
}
