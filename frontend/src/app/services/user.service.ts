import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginData } from '../interfaces/dto/user-login-data';
import { UserSignupData } from '../interfaces/dto/user-signup-data';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  //comprobar si existe token o no antes de cargar la página
  private checkAuthentication() {
    const isAuthenticated = this.cookies.get('token') !== '';
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  url: string = 'http://localhost:3000/api/users'

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.checkAuthentication();
  }

  login(data: UserLoginData){
    return this.http.post(`${this.url}/login`, data)
  }

  register(data: UserSignupData){
    return this.http.post(`${this.url}/signup`, data)
  }

  setToken(token: string){
    this.cookies.set('token', token)
    this.isAuthenticatedSubject.next(true);
  }

  logout(){
    this.cookies.delete('token')
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.cookies.get('token') !== '';
  }
}



