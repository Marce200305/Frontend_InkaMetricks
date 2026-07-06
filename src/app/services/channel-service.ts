import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Channel } from '../models/Channel';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ChannelService {

  private url = `${base_url}/channels`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Channel[]>(`${this.url}/list`);
  }
  insert(c: Channel) {
    return this.http.post(`${this.url}/new`, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  update(c: Channel){
    return this.http.put(`${this.url}/update`,c,{ responseType: 'text' });
  }
  listId(id: number) {
    return this.http.get<Channel>(`${this.url}/${id}`);
  }
}
