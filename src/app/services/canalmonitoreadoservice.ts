import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { CanalMonitoreado } from '../models/CanalMonitoreado';
import { environment } from '../../environments/environment';

const base_url=environment.base;

@Injectable({
  providedIn: 'root',
})
export class Canalmonitoreadoservice {
  private url = `${base_url}/canalesMonitoreados`;
  constructor(private http:HttpClient){}

  list(){
    return this.http.get<CanalMonitoreado[]>(`${this.url}/lista`);
  }

  insert(cnM:CanalMonitoreado){
    return this.http.post(`${this.url}/nuevo`,cnM);
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`, {responseType:'text'});
  }

  update(cnM:CanalMonitoreado){
    return this.http.put(`${this.url}/actualiza`,cnM,{responseType:'text'});
  }

  listId(id: number) {
    return this.http.get<CanalMonitoreado>(`${this.url}/${id}`);
  }
}
