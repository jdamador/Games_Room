import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckersService {

  private url = environment.server;
  pieceType: string;
  estadoJuego: any;
  idSala: string;
  keyEliminar: string;
  nivelJuego: number;

  constructor(private http: HttpClient) {

  }

  public connectToServer() {
    const socket = io.connect(this.url, { 'forceNew': true });
    return socket;
  }

  // Envia la información al API para que crear el nuevo tablero
  // Recibe un nivel dado para el juego de bot
  setLevel(nivel: number) {
    this.nivelJuego = nivel;
  }

  // obtiene el nivel de la partida
  getLevel() {
    return this.nivelJuego;
  }

  // Recibe la información del tipo de pieza con que se va a jugar
  setPieceType(pieceType: string) {
    this.pieceType = pieceType;
  }

  // Envia la información del tipo de ficha al tablero
  getPieceType() {
    return this.pieceType;
  }

  // Recibe la información del tipo de piexa con que se va a jugar
  setidSalaUnirPartida(user) {
    this.keyEliminar = user.keyEliminar;
    this.idSala = user.idSala;
  }

  // Envia la información del tipo de ficha al tablero
  getidSalaUnirPartida() {
    return this.idSala;
  }

  // Recibe la información del tipo de piexa con que se va a jugar
  setEstadoJuego(estadoJuego: any) {
    this.estadoJuego = estadoJuego;
  }

  // Envia la información del tipo de ficha al tablero
  getEstadoJuego() {
    return this.estadoJuego;
  }

  // Envia la información al API para que crear el nuevo tablero
  public envioInfoCrearTablero = (socket: any, data) => {
    socket.emit('crearTableroDama', data);
  }

  // Funcion que recibe del API el nuevo tablero
  public getTablero(socket: any, data) {
    socket.on('crearTableroDama', data);
  }

  // Envia la información al API para verificar los posible movimientos de una ficha
  public envioInfoPosibleMovimiento = (socket: any, data) => {
    socket.emit('validaMovimientoDama', data);
  }

  // Obtiene los posibles movimientos a partir de la informacion procesada por el API
  public getPosiblesMovimientos(socket: any, data) {
    socket.on('validaMovimientoDama', data);
  }

  // Envia la información al API para verificar los posible movimientos de una ficha
  public envioInfoActualizarTableroNuevoMovimiento = (socket: any, data) => {
    socket.emit('actualizarTablaDama', data);
  }

  // Obtiene los posibles movimientos a partir de la informacion procesada por el API
  public getTableroNuevoMovimiento(socket: any, data) {
    socket.on('actualizarTablaDama', data);
  }

  // envia al bot a hacer un movimiento
  public envioBotHacerJugada = (socket: any, data) => {
    socket.emit('obtenerJugadaDamaBot', data);
  }

  // obtiene el cambio realizado cuando el bot jugo
  public obtenerJugadaBot(socket: any, data) {
    socket.on('obtenerJugadaDamaBot', data);
  }

  public disconnectSession(socket: any, data) {
    socket.emit('cerrarSesionDama', data);
  }

  getSesiones() {
    return this.http.get(`${this.url}/partidasDisponiblesDamas`);
  }

  getidSala(): Observable<any> {
    return this.http.get(`${this.url}/claveUnica`);
  }

  eliminarDisponible(): Observable<any> {
    const config = {
      'id': this.keyEliminar
    };
    return this.http.post(`${this.url}/eliminarPartidaDama`, config);
  }

  getTableroAntiguo(id: any): Observable<any> {
    const config = {
      'idSala': id
    };
    return this.http.post(`${this.url}/tableroPartidaDama`, config);
  }
}
