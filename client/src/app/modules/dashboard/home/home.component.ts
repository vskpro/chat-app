import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: String;
  message: String;
  messages = [];
  socket;
  constructor(private afAuth: AngularFireAuth, private auth: AuthService) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (user) {
        this.userName = user.displayName;
      }
    });

    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      this.socket.emit('NewUser', { user: this.userName ? this.userName : 'Someone' });
    });

    this.socket.on('UserJoined', data => {
      this.messages.push(data);
    });

    this.socket.on('NewMessage', (data) => {
      console.log(data);
      this.messages.push(data);
      console.log(this.messages);
    });
  }

  send() {

    console.log(this.message);

    if (this.message) {
      this.socket.emit('SendMessage', {
        user: this.userName,
        message: this.message
      });

      this.message = null;
    }

  }

  logout() {
    this.socket.disconnect();
    this.auth.logout();
  }

}
