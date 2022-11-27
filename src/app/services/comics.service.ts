import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Comic } from '../models/Comic';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  public API_URI_COMICS = 'http://127.0.0.1:3002/api/comics';
  public API_URI_USERS = 'http://127.0.0.1:3002/api/users';

  constructor(private http: HttpClient) { }

  getComics() {
    return this.http.get(`${this.API_URI_COMICS}/list`);
  }

  getComic(id: string) {
    //let parametros = new HttpParams().set();
    return this.http.get(`${this.API_URI_COMICS}/find/${id}`);
  }

  saveComic(comic: Comic) {
    return this.http.post(`${this.API_URI_COMICS}/create`, comic);
  }

  deleteComic(id: string) {
    return this.http.delete(`${this.API_URI_COMICS}/delete/${id}`);
  }

  updateComic(id: string | number | undefined, updateComic: Comic): Observable<Comic> {
    return this.http.put(`${this.API_URI_COMICS}/update/${id}`, updateComic);
  }

  

  getUsers() {
    return this.http.get(`${this.API_URI_USERS}/list`);
  }

  getUser(id: string) {
    //let parametros = new HttpParams().set();
    return this.http.get(`${this.API_URI_USERS}/find/${id}`);
  }

  saveUser(user: User) {
    return this.http.post(`${this.API_URI_USERS}/create`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.API_URI_USERS}/delete/${id}`);
  }

  updateUser(id: string | number | undefined, updateUser: User): Observable<User> {
    return this.http.put(`${this.API_URI_USERS}/update/${id}`, updateUser);
  }
}
