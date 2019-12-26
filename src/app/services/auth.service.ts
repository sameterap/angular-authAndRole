import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  constructor(private http: Http, private router: Router) { }

  login(model: any) {
    return this.http.post('/api/authenticate', JSON.stringify(model))
      .pipe(
        map(response => {
          let result = response['_body'];
          if (result && result.token) {
            localStorage.setItem('token', result.token);
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);

    // if (!token) return false;


    // const isExpired = this.jwtHelper.isTokenExpired(token);

    // // this.jwtHelper.getTokenExpirationDate(token);

    // return !isExpired;

  }

  get currentUser() {
    const token = localStorage.getItem('token');

    if (!token) return null;

    return this.jwtHelper.decodeToken(token);
  }
}
