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

  public playerMove(socket: any, gameUpdate: any) {
    return socket.emit('player-move', gameUpdate);
  }

  public gameUpdated(socket: any, updateFunction) {
    socket.on('game-updated', updateFunction);
  }

  public gameOver(socket: any, gameOverFunction) {
    socket.on('game-over', gameOverFunction);
  }

  public resetGame(socket: any, gameStatus: any) {
    socket.emit('reset-game', {
      username: this.userInfo.email,
      gameStatus: gameStatus
    });
  }

  public disconnect(socket: any, disconnectFunction) {
    socket.on('opponent left', disconnectFunction);
  }

  public waitingForOpponent(socket: any, waitingFunction) {
    socket.on('waiting for opponent', waitingFunction);
  }

  public disconnectSession(socket: any) {
    socket.disconnect();
  }
  getAllBoard(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/getBoard');
  }
}
