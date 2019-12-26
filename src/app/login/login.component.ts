import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  signIn(credentials) {
    this.authService.login(credentials).subscribe(result => {
      if (result) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      }
      else {
        this.invalidLogin = true;
      }
    });
  }

}
