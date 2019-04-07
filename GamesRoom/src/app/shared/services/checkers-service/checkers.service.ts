import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CheckersService {

  private url = 'http://localhost:3000';
  private socket;  


  constructor() {
    this.socket = io(this.url);
   }

   //Envia la información al API para que crear el nuevo tablero
  public envioInfoCrearTablero = (data) => {
    this.socket.emit('crearTableroDama', data);
  }

   //Funcion que recibe del API el nuevo tablero
  public getTablero(){
    return Observable.create((observer)=>{
      this.socket.on('crearTableroDama', (data)=>{
        //console.log(data);
        observer.next(data);
      });
    });
  }

  //Envia la información al API para verificar los posible movimientos de una ficha
  public envioInfoPosibleMovimiento = (data) =>{
    this.socket.emit('validaMovimientoDama', data);
  }

  //Obtiene los posibles movimientos a partir de la informacion procesada por el API
  public getPosiblesMovimientos(){
    return Observable.create((observer)=>{
      this.socket.on('validaMovimientoDama', (data)=>{
        //console.log(data);
        observer.next(data);
      })
    })
  }
}