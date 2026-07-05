import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { DeteccionPublicitaria } from '../models/DeteccionPublicitaria';

const base_url=environment.base;

@Injectable({
  providedIn: 'root',
})
export class Deteccionpublicitariaservice {
  private url= `${base_url}/deteccionesPublicitarias`
  constructor(private http:HttpClient){}

  list(){
    return this.http.get<DeteccionPublicitaria[]>(`${this.url}/lista`);
  }

  insert(dtP:DeteccionPublicitaria){
    return this.http.post(`${this.url}/nuevo`,dtP)
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`, {responseType:'text'});
  }

  update(dtP:DeteccionPublicitaria){
    return this.http.put(`${this.url}/actualiza`, dtP, {responseType:'text'})
  }

  listId(id: number) {
    return this.http.get<DeteccionPublicitaria>(`${this.url}/${id}`);
  }
}
