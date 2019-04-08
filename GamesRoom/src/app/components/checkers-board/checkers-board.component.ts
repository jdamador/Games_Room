import { Component, OnInit, OnDestroy } from '@angular/core';
import { CheckersService } from 'src/app/shared/services/checkers-service/checkers.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-checkers-board',
  templateUrl: './checkers-board.component.html',
  styleUrls: ['./checkers-board.component.css']
})
export class CheckersBoardComponent implements OnInit, OnDestroy {
    idSala : string = "_201948846984v8oebyodi";
    uidJugador : string; 
    turno: string= this.uidJugador;
    tablero = [];
    xActual : string;
    yActual : string;
    ganador : string;
    estado = "false";
    private session: any;

  constructor(private checkersService: CheckersService, private authService: AuthService) { }

  ngOnInit() {
    //this.uidJugador= this.authService.userData.uid;
    this.uidJugador= "Jugador1"
    console.log(this.uidJugador);
    this.session = this.checkersService.connectToServer();
    this.envioInfoCrearTablero(this.idSala);
    // this.checkersService.getTablero()
    //   .subscribe((data) => {
    //     this.idSala = data.idSala;
    //     this.tablero = data.tablero;
    //   });
      this.checkersService.getTablero(this.session, (data: any) => {
        this.tablero = data.tablero;
        this.idSala = data.idSala
        this.turno = data.turno;
        console.log(data.tablero)
      });

      this.checkersService.getTableroNuevoMovimiento(this.session, (data: any) => {
        this.idSala = data.idSala;
        this.tablero = data.tablero;
        this.ganador = data.ganador;
        this.turno = data.turno;
        console.log("Tablero Nuevo Movimientos: " + data.tablero);
      });

      this.checkersService.getCambioTurno(this.session, (data: any) => {
        this.turno = data.turno;
      });

      this.checkersService.getPosiblesMovimientos(this.session, (data: any) => {
        this.tablero = data.tablero;
        this.idSala = data.idSala;
        this.ganador= data.ganador;
        console.log("Tablero Posibles Movimientos: " + data.tablero);
        this.estado = "true";
        console.log("Estado = " + this.estado);      
      });
    }

    ngOnDestroy() {
      this.checkersService.disconnectSession(this.session);
    }

  //Envia información hacia el servicio para crear el tablero
  envioInfoCrearTablero(id: string){
    this.checkersService.envioInfoCrearTablero(this.session, {"idSala": id,"jugador": this.uidJugador});
  }

  //Envia información hacia el servicio para verificar los posible movimientos de una ficha
  async envioInfoVerficarPosiblesMovimiento(){
    if(this.turno==this.uidJugador){
      this.checkersService.envioInfoPosibleMovimiento(this.session,{"jugador": this.uidJugador, "idSala":this.idSala, "x": this.xActual, "y":this.yActual});
    }
    else{
      console.log("no es su turno")
    }
 
  }
  
  //Envia información hacia el servicio para actualizar la tabla con un nuevo movimiento
  async envioInfoActualizarTableroNuevoMovimiento(){
    if(this.turno==this.uidJugador){
      this.checkersService.envioInfoActualizarTableroNuevoMovimiento(this.session,{"idSala": this.idSala, "x": this.xActual, "y":this.yActual})
    }
    else{
      console.log("no es su turno")
    }
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
  
        this.estado = "false";
        console.log("Estado = " + this.estado);
      }
    }
  }
}
