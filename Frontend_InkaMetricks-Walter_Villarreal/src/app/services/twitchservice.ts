import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BASE = `${environment.base}/twitch`;

@Injectable({
  providedIn: 'root',
})
export class Twitchservice {
  constructor(private http: HttpClient) {}

  getChannel(username: string): Observable<any> {
    return this.http.get(`${BASE}/channel/${username}`);
  }

  getStream(username: string): Observable<any> {
    return this.http.get(`${BASE}/stream/${username}`);
  }

  search(query: string): Observable<any> {
    return this.http.get(`${BASE}/search`, { params: { q: query } });
  }
}
