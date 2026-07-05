import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { Empresa } from '../models/Empresa';

const base_url=environment.base;

@Injectable({
  providedIn: 'root',
})
export class Empresaservice {
  private url = `${base_url}/empresas`
  constructor(private http:HttpClient){}

  list(){
    return this.http.get<Empresa[]>(`${this.url}/lista`);
  }

  insert(emp:Empresa){
    return this.http.post(`${this.url}/nuevo`,emp)
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`, {responseType:'text'});
  }

  update(emp:Empresa){
    return this.http.put(`${this.url}/actualiza`, emp,{responseType:'text'});
  }

  listId(id: number) {
    return this.http.get<Empresa>(`${this.url}/${id}`);
  }
}
