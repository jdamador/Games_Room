import { Component, OnInit } from '@angular/core';
import { CheckersService } from 'src/app/shared/services/checkers-service/checkers.service';

@Component({
  selector: 'app-checkers-board',
  templateUrl: './checkers-board.component.html',
  styleUrls: ['./checkers-board.component.css']
})
export class CheckersBoardComponent implements OnInit {
    idSala : string;
    uidJugador1 = "jugador1";
    uidJugador2 = "jugador2";
    tablero = [];
    xActual : string;
    yActual : string;
    ganador : string;
    estado = "false";

  constructor(private checkersService: CheckersService) { }

  ngOnInit() {
    this.envioInfoCrearTablero();
    this.checkersService.getTablero()
      .subscribe((data) => {
        this.idSala = data.idSala;
        this.tablero = data.tablero;
      });
    }

  //Envia información hacia el servicio para crear el tablero
  envioInfoCrearTablero(){
    this.checkersService.envioInfoCrearTablero({"jugador1": this.uidJugador1, "jugador2":this.uidJugador2});
  }

  //Envia información hacia el servicio para verificar los posible movimientos de una ficha
  envioInfoVerficarPosiblesMovimiento(){
    this.checkersService.envioInfoPosibleMovimiento({"jugador": this.uidJugador1, "idSala":this.idSala, "x": this.xActual, "y":this.yActual})
  }

  //Obtiene del servicio los posibles movimientos de una ficha
  getPosiblesMovimientos(){
    this.checkersService.getPosiblesMovimientos()
    .subscribe((data)=>{
      this.idSala = data.idSala;
      this.tablero = data.tablero;
      this.ganador = data.ganador;
      console.log("Tablero Posibles Movimientos: " + data.tablero);
    })
  }
  
  //Envia información hacia el servicio para actualizar la tabla con un nuevo movimiento
  envioInfoActualizarTableroNuevoMovimiento(){
    this.checkersService.envioInfoActualizarTableroNuevoMovimiento({"idSala": this.idSala, "x": this.xActual, "y":this.yActual})
  }

  //Obtiene del servicio los posibles movimientos de una ficha
  getTableroNuevoMovimiento(){
    this.checkersService.getTableroNuevoMovimiento()
    .subscribe((data)=>{
      this.idSala = data.idSala;
      this.tablero = data.tablero;
      this.ganador = data.ganador;
      console.log("Tablero Nuevo Movimientos: " + data.tablero);
    })
    
  }

  function(row , col){
    this.xActual = row;
    this.yActual = col;

    if(this.estado == "false"){
      if(this.tablero[this.xActual][this.yActual] != 'V'){
        this.envioInfoVerficarPosiblesMovimiento();
        this.getPosiblesMovimientos();
        this.estado = "true";
      }
    }

    else if(this.estado == "true"){
      this.envioInfoActualizarTableroNuevoMovimiento();
      this.getTableroNuevoMovimiento();
      this.estado = "false";
      console.log("Entó al else");
    }
  }



}
