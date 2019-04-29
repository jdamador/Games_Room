import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckersService {

  private url = environment.localServer;
  pieceType: string;
  gameState: any;
  idRoom: string;
  keyDelete: string;
  gameLevel: number;

  constructor(private http: HttpClient) {

  }

  public connectToServer() {
    const socket = io.connect(this.url, { 'forceNew': true });
    return socket;
  }

  // Send information to API to create a new board.
  // Receive a level for bot game.
  setLevel(level: number) {
    this.gameLevel = level;
  }

  // Get match level.
  getLevel() {
    return this.gameLevel;
  }

  // Receive the information about kind of piece to play.
  setPieceType(pieceType: string) {
    this.pieceType = pieceType;
  }

  // Send information about kind of piece to board.
  getPieceType() {
    return this.pieceType;
  }

  // Receive the information about which piece will be use to play.
  setIdRoomJoinGame(user) {
    this.keyDelete = user.keyDelete;
    this.idRoom = user.idRoom;
  }

  // Send kind of piece to board.
  getIdRoomJoinGame() {
    return this.idRoom;
  }

  setGameState(gameState: any) {
    this.gameState = gameState;
  }

  getGameState() {
    return this.gameState;
  }

  // Send information to API to create a board.
  public sendInfoCreateBoard = (socket: any, data) => {
    socket.emit('createBoardDama', data);
  }

  // Function that recieve from API a new board.
  public getBoard(socket: any, data) {
    socket.on('createBoardDama', data);
  }

  // Send information to API to validate moves.
  public sendInfoPossibleMove = (socket: any, data) => {
    socket.emit('validateMoveDama', data);
  }

  // Get possibles movements from API validations.
  public getPosiblesMovimientos(socket: any, data) {
    socket.on('validateMovementDama', data);
  }

  // Send information to validate possibles movements.
  public sendUpdateBoardNewMove = (socket: any, data) => {
    socket.emit('updateTableDama', data);
  }

  // Get possibles movements from API validations.
  public getBoardNewMovement(socket: any, data) {
    socket.on('updateTableDama', data);
  }

  // Set bot make a movement.
  public sendBotMakePlay = (socket: any, data) => {
    socket.emit('getPlayDamaBot', data);
  }

  // Get changes that is make when the bot play.
  public getBotPlay(socket: any, data) {
    socket.on('getPlayDamaBot', data);
  }

  public disconnectSession(socket: any, data) {
    socket.emit('closeSessionDama', data);
  }

  getSesiones() {
    return this.http.get(`${this.url}/gamesAvailableDamas`);
  }

  getIdRoom(): Observable<any> {
    return this.http.get(`${this.url}/uniqueKey`);
  }

  // Delete availables games when are join two players.
  deleteAvailable(): Observable<any> {
    const config = {
      'id': this.keyDelete
    };
    return this.http.post(`${this.url}/deleteGameDama`, config);
  }
  // Get before board.
  getOlderBoard(id: any): Observable<any> {
    const config = {
      'idRoom': id
    };
    return this.http.post(`${this.url}/boardGameDama`, config);
  }
}
