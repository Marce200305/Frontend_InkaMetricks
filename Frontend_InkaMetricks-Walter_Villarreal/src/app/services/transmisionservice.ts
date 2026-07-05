import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { Transmision } from '../models/Transmision';

const base_url=environment.base;

@Injectable({
  providedIn: 'root',
})
export class Transmisionservice {
  private url = `${base_url}/transmisiones`
  constructor(private http:HttpClient){}

  list(){
    return this.http.get<Transmision[]>(`${this.url}/lista`)
  }

  insert(trn:Transmision){
    return this.http.post(`${this.url}/nuevo`,trn);
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`, {responseType:'text'})
  }

  update(trn:Transmision){
    return this.http.put(`${this.url}/actualiza`,trn,{responseType:'text'});
  }

  listId(id: number) {
    return this.http.get<Transmision>(`${this.url}/${id}`);
  }
}
