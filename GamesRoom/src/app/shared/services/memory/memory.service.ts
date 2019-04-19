import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  // Url to connect with node js server (Use game functions).
  private url = 'https://gameroomapi.herokuapp.com';
  private boardSize = 10;
  public boardType = '';
  private gameProcess = null;
  // Get user data from Auth service.
  private userInfo = this.authService.userInfo();

  constructor(private authService: AuthService, private http: HttpClient) { }
  // Open a new connection to server.
  public connectToServer(id: string) {
    const socket = io.connect(this.url, { foceNew: true });
    this.joinGame(socket, id);
    return socket;
  }

  // Add new player to game room.
  private joinGame(socket: any, id: string) {
    socket.emit('join-game', {
      gameID: id,
      username: this.userInfo,
      tamano: this.boardSize,
      gameType: this.boardType,
      idGame: this.gameProcess
    });
    this.gameProcess = null;
  }

  // Validate some player action.
  public playerMove(socket: any, gameUpdate: any) {
    return socket.emit('player-action', gameUpdate);
  }

  // Alert when some change was make.
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

  // Alert when the game was complete.
  public gameOver(socket: any, gameOverFunction) {
    socket.on('game-over', gameOverFunction);
  }
  public setBoardSize(size) {
    this.boardSize = size;
  }
  public setGameType(type) {
    this.boardType = type;
  }
  // Alert to save a game.
  public saveGame(socket: any, gameUpdate: any) {
    return socket.emit('saveGame', gameUpdate);
  }

  public setGameObtained(gameProcess) {
    this.gameProcess = gameProcess;
  }
}
