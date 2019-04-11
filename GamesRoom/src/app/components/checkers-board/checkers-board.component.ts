import { Component, OnInit, OnDestroy } from '@angular/core';
import { CheckersService } from 'src/app/shared/services/checkers-service/checkers.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-checkers-board',
  templateUrl: './checkers-board.component.html',
  styleUrls: ['./checkers-board.component.css']
})
export class CheckersBoardComponent implements OnInit, OnDestroy {
    idSala : string = "_20194884698";
    uidJugador : string; 
    turno: string;
    tablero = [];
    xActual : string;
    yActual : string;
    ganador : string;
    estado = "false";
    color: string;
    private session: any;
    type_piece : string;

    turnoJugador: string= 'Blancas'
    numBlancas: number = 15;
    numRojas: number = 15;

  constructor(private checkersService: CheckersService, private authService: AuthService) { }

  ngOnInit() {
    this.type_piece = this.checkersService.getPieceType();
    this.uidJugador= this.authService.userData.uid;
    console.log("Valor: " + this.type_piece);
    //this.uidJugador= "Jugador1"
    this.session = this.checkersService.connectToServer();
    this.envioInfoCrearTablero(this.idSala);
      this.checkersService.getTablero(this.session, (data: any) => {
        this.tablero = data.tablero;
        this.idSala = data.idSala
        this.turno = data.turno;
        this.color= data.color;
        console.log(this.turno);
      });

      this.checkersService.getTableroNuevoMovimiento(this.session, (data: any) => {
        this.idSala = data.idSala;
        this.tablero = data.tablero;
        this.ganador = data.ganador;
        this.turno= data.turno;
      });

      this.checkersService.getPosiblesMovimientos(this.session, (data: any) => {
        this.tablero = data.tablero;
        this.idSala = data.idSala;
        this.ganador= data.ganador;
        this.turno = data.turno;
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
      this.estado="true";
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
    var pos= this.tablero[this.xActual][this.yActual];
    console.log("-----------")
    console.log(this.color);
    console.log(this.uidJugador);
    console.log(this.turno);
    console.log(this.estado);
    console.log("-----------")
    if(this.estado == "false" && this.turno==this.uidJugador){
      if(this.color=="B"){
        if(pos != 'V' && pos!= 'R' && pos!= 'KR'){
          await this.envioInfoVerficarPosiblesMovimiento();
        }
      }
      else{
        if(this.color=="R"){
          if(pos != 'V' && pos!= 'B' && pos!= 'KB'){
            await this.envioInfoVerficarPosiblesMovimiento();
          }
        }
      }   
    }

    else if(this.estado == "true"){
      if(pos == 'PV' && this.turno==this.uidJugador){
        console.log()
        this.envioInfoActualizarTableroNuevoMovimiento();
        this.estado = "false";
      }
    }
  }
}