import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BASE = `${environment.base}/youtube`;

@Injectable({
  providedIn: 'root',
})
export class Youtubeservice {
  constructor(private http: HttpClient) {}

  getChannel(id: string): Observable<any> {
    return this.http.get(`${BASE}/channel/${id}`);
  }

  searchChannel(query: string): Observable<any> {
    return this.http.get(`${BASE}/channel/search`, { params: { q: query } });
  }

  getLiveStream(channelId: string): Observable<any> {
    return this.http.get(`${BASE}/channel/${channelId}/live`);
  }
}
