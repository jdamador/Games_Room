import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {

  private url = 'http://localhost:3000';
  private userInfo = this.authService.userData;

  constructor(private authService: AuthService, private http: HttpClient) {}

  public connectToServer(id: string) {
    const socket = io.connect(this.url, { foceNew: true });
    this.joinGame(socket, id);
    return socket;
  }

  private joinGame(socket: any, id: string) {
    socket.emit('join-game', { gameID: id, username: this.userInfo });
  }

  getAllBoard(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/getBoard');
  }
}
