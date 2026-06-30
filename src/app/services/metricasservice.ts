import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { Metricas } from '../models/Metricas';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Metricasservice {
  private url = `${base_url}/metricasSnapshots`
  constructor(private http:HttpClient){}

  list(){
    return this.http.get<Metricas[]>(`${this.url}/lista`);
  }

  insert(mtr:Metricas){
    return this.http.post(`${this.url}/nuevo`, mtr);
  }

  update(mtr:Metricas){
    return this.http.put(`${this.url}/actualiza`, mtr, {responseType:'text'});
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`, {responseType:'text'});
  }

  listId(id: number) {
    return this.http.get<Metricas>(`${this.url}/${id}`);
  }
}
