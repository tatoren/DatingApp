import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { fromEventPattern } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http
    .post(this.baseurl + 'login', model)
      .pipe(
       map((response: any) => {
          const user = response;
          if (user) {
           localStorage.setItem('token', user.token);
           this.decodedToken = this.jwtHelper.decodeToken(user.token);
          }
        })
    );
  }

  register(model: any) {
    return this.http.post(this.baseurl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}