import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // Server address.
  private url = environment.localServer;

  // Socket settings.
  private socket;
  private room = '';
  constructor() {
    this.socket = io(this.url);
  }

  // Get all messages send.
  public getMessages = () => {
    return Observable.create(observer => {
      this.socket.on('sendMessage', data => {
        console.log(data);
        observer.next(data);
      });
    });
  }

  // Send information to current room.
  public sendInfo = data => {
    this.socket.emit('sendMessage', data);
  }

  // Join to current room.
  public joinSession = (data) => {
    this.socket.emit('joinSesionChat', data);
  }

  // Set a new room.
  public setRoom(room) {
    this.room = room;
  }

  // Return current room.
  public getRoom() {
    return this.room;
  }
}
