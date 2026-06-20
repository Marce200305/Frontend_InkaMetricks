import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CanalService {
  
  private url = `${base_url}/canales`;


}
