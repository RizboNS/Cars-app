import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenObj } from '../models/token-obj.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenObj!: TokenObj
  private _url: string = 'http://localhost:3000/users'
  private _loggedInUserId$ = new BehaviorSubject('')
  private _isLoggedIn$ = new BehaviorSubject(false)
  loggedInUserId$ = this._loggedInUserId$.asObservable()
  isLoggedIn$ = this._isLoggedIn$.asObservable()



  constructor(
    private userService: UserService,
    private router: Router,
  ) { 
    const token = localStorage.getItem('auth-token')
    this._isLoggedIn$.next(!!token)
  }

  register(user: {}){
    this.userService.register(user).subscribe((res) => {
      localStorage.setItem('auth-token', res.token)
      this.tokenObj =  jwt_decode(res.token)
      this._loggedInUserId$.next(this.tokenObj._id)
      this._isLoggedIn$.next(true)
      this.router.navigate(['user', this.tokenObj._id])
    }
  )
  }
  login(user: {}) {
    this.userService.login(user).subscribe((res) => {
        localStorage.setItem('auth-token', res.token)
        this.tokenObj =  jwt_decode(res.token)
        this._isLoggedIn$.next(true)
        this._loggedInUserId$.next(this.tokenObj._id)
        this.router.navigate(['user', this.tokenObj._id])
      }
    )
  }
  logout(){
    localStorage.removeItem('auth-token')
    this._loggedInUserId$.next('')
    this._isLoggedIn$.next(false)
  }

  getUserIdFromToken(): string {
    const token = localStorage.getItem('auth-token')
    if (token) {
      this.tokenObj = jwt_decode(token)
      return this.tokenObj._id
    }
    return ''
  }

  getToken(){
    return localStorage.getItem('auth-token')
  }
  
}
