import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  private socket;
  
  constructor() { }

  connect() {
    this.socket = io('http://localhost:3000');
  }

  joinRoom(userName,roomName) {
    this.socket.joinRoom('joinRoom',{ 'name': userName, 'roomName': roomName });
  }

  message() {

  }

}
