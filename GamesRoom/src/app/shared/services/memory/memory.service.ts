import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  // Url to connect with node js server (Use game functions).
  private url = 'http://localhost:3000';

  // Get user data from Auth service.
  private userInfo = this.authService.userInfo();

  constructor(private authService: AuthService, private http: HttpClient) {}
  // Open a new connection to server.
  public connectToServer(id: string, size: number) {
    const socket = io.connect(this.url, { foceNew: true });
    this.joinGame(socket, id, size);
    return socket;
  }

  // Add new player to game room.
  private joinGame(socket: any, id: string, size: number) {
    socket.emit('join-game', {
      gameID: id,
      username: this.userInfo,
      tamano: size
    });
  }

  // Validate some player action.
  public playerMove(socket: any, gameUpdate: any) {
    return socket.emit('player-action', gameUpdate);
  }

  //
  public gameUpdated(socket: any, updateFunction) {
    socket.on('game-updated', updateFunction);
  }

  // Wait until a player join to room.
  public waitingForOpponent(socket: any, waitingFunction) {
    socket.on('waiting for opponent', waitingFunction);
  }

  // Action when some player left the match.
  public disconnect(socket: any, disconnectFunction) {
    socket.on('opponent left', disconnectFunction);
  }

  // Close the connection with the server.
  public disconnectSession(socket: any) {
    socket.disconnect();
  }
}