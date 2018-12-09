import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: any;
  isSubmitted: Boolean;
  constructor(private auth: AuthService, private router: Router) {
    this.initForm();
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  initForm() {
    this.user = {
      name: null,
      email: null,
      password: null
    };
  }

  register() {
    this.isSubmitted = true;
    this.auth.createUser(this.user)
      .then(data => {
        console.log(data);
        data.user.updateProfile({
          displayName: this.user.name,
          photoURL: null
        });
        this.loginAfterRegistration(data);
      }).catch(error => {
        console.log(error);
        this.isSubmitted = false;
        alert(error.message);
      });
  }

  loginAfterRegistration(data) {
    console.log(data);
    this.auth.loginUser(this.user)
      .then(data => {
        console.log(data);
        this.isSubmitted = false;
        this.auth.setUserId(data.user.uid);
        this.router.navigate(['dashboard']);
        this.initForm();
      })
      .catch(error => {
        console.log(error);
        this.isSubmitted = false;
        alert(error.message);
      });
  }

}
