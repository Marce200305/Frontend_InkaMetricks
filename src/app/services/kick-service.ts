import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BASE = `${environment.base}/kick`;

@Injectable({ providedIn: 'root' })
export class KickService {
  constructor(private http: HttpClient) {}

  getChannel(slug: string): Observable<any> {
    return this.http.get(`${BASE}/channel/${slug}`);
  }

  search(query: string): Observable<any> {
    return this.http.get(`${BASE}/search`, { params: { q: query } });
  }
}
