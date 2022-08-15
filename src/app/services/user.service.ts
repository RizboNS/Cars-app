import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url: string = 'http://localhost:3000/users'
  constructor(
    private http: HttpClient
  ) { }
  getUser(id: string): Observable<User> {
    return this.http.get<User>(this._url + '\\' + id)
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this._url)
  }
  register(user: {}): Observable<{}> {
    return this.http.post<{}>(this._url + '\\' + 'register', user)
  }
  login(user: {}): Observable<string> {
    return this.http.post<string>(this._url + '\\' + 'login', user)
  }
}
