import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user; any;
  isSubmitted: Boolean;
  constructor(private auth: AuthService, private router: Router) {
    this.initForm();
    if(this.auth.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  initForm() {
    this.user = {
      email: null,
      password: null
    };
  }

  login() {
    this.isSubmitted = true;
    this.auth.loginUser(this.user)
      .then(data => {
        this.isSubmitted = false;
        this.auth.setUserId(data.user.uid);
        this.initForm();
        this.router.navigate(['dashboard']);
        console.log(data);
      })
      .catch(error => {
        console.log(error);
        this.isSubmitted = false;
        alert(error.message);
      });
  }

}
