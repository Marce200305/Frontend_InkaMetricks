import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { Users } from '../models/Users';

const base_url=environment.base;

@Injectable({
  providedIn: 'root',
})
export class Usersservice {
  private url = `${base_url}/usuarios`
  constructor(private http:HttpClient){}

  list(){
    return this.http.get<Users[]>(`${this.url}/lista`);
  }

  insert(us:Users){
    return this.http.post(`${this.url}/nuevo`,us);
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`, {responseType:'text'});
  }

  update(us:Users){
    return this.http.put(`${this.url}/actualiza`,us,{responseType:'text'})
  }

  listId(id: number) {
    return this.http.get<Users>(`${this.url}/${id}`);
  }
}