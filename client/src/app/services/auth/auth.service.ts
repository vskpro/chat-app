import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  createUser(user) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  loginUser(user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  setUserId(id) {
    window.localStorage.setItem('uid', id);
  }

  getUserId() {
    return window.localStorage.getItem('uid');
  }

  isLoggedIn() {
    if (this.getUserId()) {
      return true;
    }
    return false;
  }

  clearStorage() {
    window.localStorage.clear();
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.clearStorage();
      this.router.navigate(['']);
    }).catch(error => {
      console.log(error);
    });;
  }

}
