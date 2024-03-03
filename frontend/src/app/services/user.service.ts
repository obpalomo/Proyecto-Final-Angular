import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginData } from '../interfaces/dto/user-login-data';
import { UserSignupData } from '../interfaces/dto/user-signup-data';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = 'http://localhost:3000/api/users'


  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(data: UserLoginData){
    return this.http.post(`${this.url}/login`, data)
  }

  register(data: UserSignupData){
    return this.http.post(`${this.url}/signup`, data)
  }

  setToken(token: string){
    this.cookies.set('token', token)
  }

  logout(){
    this.cookies.delete('token')
  }
}
