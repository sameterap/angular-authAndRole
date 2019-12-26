import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    this.router.navigate(['/']);
  }
}
