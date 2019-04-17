import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CheckersService {

  private url = 'http://localhost:3000';


  constructor() {

  }

  public connectToServer() {
    const socket = io.connect(this.url, {'forceNew': true});
    return socket;
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
  public envioInfoPosibleMovimiento = (socket: any, data) =>{
    socket.emit('validaMovimientoDama', data);
  }

  // Obtiene los posibles movimientos a partir de la informacion procesada por el API
  public getPosiblesMovimientos(socket: any, data) {
    socket.on('validaMovimientoDama', data);
  }

  // Envia la información al API para verificar los posible movimientos de una ficha
  public envioInfoActualizarTableroNuevoMovimiento = (socket: any, data) =>{
    socket.emit('actualizarTablaDama', data);
  }

  // Obtiene los posibles movimientos a partir de la informacion procesada por el API
  public getTableroNuevoMovimiento(socket: any, data) {
    socket.on('actualizarTablaDama', data);
  }

  public disconnectSession(socket: any) {
    socket.disconnect();
  }
}
