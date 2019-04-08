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
    num = 1;

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
  async envioInfoVerficarPosiblesMovimiento(){
    this.checkersService.envioInfoPosibleMovimiento({"jugador": this.uidJugador1, "idSala":this.idSala, "x": this.xActual, "y":this.yActual});
    await this.getPosiblesMovimientos();
  }

  //Obtiene del servicio los posibles movimientos de una ficha
  async getPosiblesMovimientos(){
    this.checkersService.getPosiblesMovimientos().elementAt(this.num)
    .subscribe((data)=>{
      this.num ++;
      this.idSala = data.idSala;
      this.tablero = data.tablero;
      this.ganador = data.ganador;
      console.log(data.ganador);
      console.log(this.ganador);
      console.log("Tablero Posibles Movimientos: " + data.tablero);
      if(this.ganador == "noturno"){
        alert("¡No es tu turno!");
      }
      else{
        this.estado = "true";
        console.log("Estado = " + this.estado);
      }
    });
  }
  
  //Envia información hacia el servicio para actualizar la tabla con un nuevo movimiento
  async envioInfoActualizarTableroNuevoMovimiento(){
    this.checkersService.envioInfoActualizarTableroNuevoMovimiento({"idSala": this.idSala, "x": this.xActual, "y":this.yActual})
  }

  //Obtiene del servicio los posibles movimientos de una ficha
  async getTableroNuevoMovimiento(){
    this.checkersService.getTableroNuevoMovimiento()
    .subscribe((data)=>{
      this.idSala = data.idSala;
      this.tablero = data.tablero;
      this.ganador = data.ganador;
      console.log("Tablero Nuevo Movimientos: " + data.tablero);
    })

  }

  async function(row , col){
    this.xActual = row;
    this.yActual = col;
    if(this.estado == "false"){
      if(this.tablero[this.xActual][this.yActual] != 'V'){
        await this.envioInfoVerficarPosiblesMovimiento();
        console.log(this.ganador);
      }
    }

    else if(this.estado == "true"){
      if(this.tablero[this.xActual][this.yActual] != 'V'){
        this.envioInfoActualizarTableroNuevoMovimiento();
        this.getTableroNuevoMovimiento();
        this.estado = "false";
        console.log("Estado = " + this.estado);
      }
    }
  }
}
