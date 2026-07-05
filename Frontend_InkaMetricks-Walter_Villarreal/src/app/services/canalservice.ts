import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { Canal } from '../models/Canal';
import { response } from 'express';
import { environment } from '../../environments/environment';

const base_url=environment.base;

@Injectable({
  providedIn: 'root',
})
export class Canalservice {
  private url = `${base_url}/canales`;
  constructor(private http:HttpClient){}

  list(){
    return this.http.get<Canal[]>(`${this.url}/lista`);
  }

  insert(cn:Canal){
    return this.http.post(`${this.url}/nuevo`,cn);
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`,{responseType:'text'});
  }

  update(cn:Canal){
    return this.http.put(`${this.url}/actualiza`,cn,{responseType:'text'});
  }

  listId(id: number) {
    return this.http.get<Canal>(`${this.url}/${id}`);
  }
}
