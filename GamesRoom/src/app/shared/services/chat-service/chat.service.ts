import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = environment.serverHeroku;
  private socket;
  private sala = '';
  constructor() {
    this.socket = io(this.url);
  }

  public getMessages = () => {
    return Observable.create(observer => {
      this.socket.on('sendMessage', data => {
        console.log(data);
        observer.next(data);
      });
    });
  }

  public envioInfo = data => {
    this.socket.emit('sendMessage', data);
  }

  public entrarSesion = (data) => {
    this.socket.emit('entrarSesionChat', data);
  }
  public setSala(sala) {
    this.sala = sala;
  }
  public getSala() {
    return this.sala;
  }
}
