import { Component, OnInit, OnDestroy } from '@angular/core';
import { CheckersService } from 'src/app/shared/services/checkers-service/checkers.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-checkers-board',
  templateUrl: './checkers-board.component.html',
  styleUrls: ['./checkers-board.component.css']
})
export class CheckersBoardComponent implements OnInit, OnDestroy {
    idSala : any;
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
    estadoJuego : any;
    turnoJugador: string= '-'
    numBlancas: number = 0;
    numRojas: number = 0;

  constructor(
    private checkersService: CheckersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
      this.estadoJuego = this.checkersService.getEstadoJuego();
      if(this.estadoJuego == false){ //Para crear una nueva partida
        console.log("Entra if --> Crea partida")
        this.checkersService.getidSala().subscribe(
          data => {
            this.idSala= data.idSala;
            this.envioInfoCrearTablero(this.idSala);
          },
          error => {
            console.log("Error en la consulta");
          }
        );
      }

      else if(this.estadoJuego == true){ //Para unirse a una partida
        console.log("Entra else if --> Se une a partida")
        this.idSala = this.checkersService.getidSalaUnirPartida();
        console.log("ID SALA UNIR: " + this.idSala)
        this.envioInfoCrearTablero(this.idSala);
      }
      
      this.type_piece = this.checkersService.getPieceType();
      this.uidJugador= this.authService.userData.uid;
      this.session = this.checkersService.connectToServer();
      
      
      
      this.checkersService.getTablero(this.session, (data: any) => {
        this.tablero = data.tablero;
        this.idSala = data.idSala
        this.turno = data.turno;
        this.color= data.color;
        this.numBlancas= data.numBlancas;
        this.numRojas= data.numRojas;
        if(this.color==='B'){
          this.turnoJugador= 'Blancas'
        }
        else{
          this.turnoJugador= 'Rojas'
        }
      });

      this.checkersService.getTableroNuevoMovimiento(this.session, (data: any) => {
      this.idSala = data.idSala;
      this.tablero = data.tablero;
      this.ganador = data.ganador;
      this.turno= data.turno;
      this.numBlancas= data.numBlancas;
      this.numRojas= data.numRojas;
      if(this.color==='B'){
        this.turnoJugador= 'Blancas'
      }
      else{
        this.turnoJugador= 'Rojas'
      }
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
    envioInfoCrearTablero(id: string) {
      this.checkersService.envioInfoCrearTablero(this.session, {
        idSala: id,
        jugador: this.uidJugador
      });
    }

    //Envia información hacia el servicio para verificar los posible movimientos de una ficha
    async envioInfoVerficarPosiblesMovimiento() {
      if (this.turno == this.uidJugador) {
        this.checkersService.envioInfoPosibleMovimiento(this.session, {
          jugador: this.uidJugador,
          idSala: this.idSala,
          x: this.xActual,
          y: this.yActual
        });
        this.estado = 'true';
      } else {
        console.log('no es su turno');
      }
  }

  //Envia información hacia el servicio para actualizar la tabla con un nuevo movimiento
  async envioInfoActualizarTableroNuevoMovimiento() {
    if (this.turno == this.uidJugador) {
      this.checkersService.envioInfoActualizarTableroNuevoMovimiento(
        this.session,
        { idSala: this.idSala, x: this.xActual, y: this.yActual }
      );
    } else {
      console.log('no es su turno');
    }
  }

  async function(row, col) {
    this.xActual = row;
    this.yActual = col;
    var pos = this.tablero[this.xActual][this.yActual];
    console.log('-----------');
    console.log(this.color);
    console.log(this.uidJugador);
    console.log(this.turno);
    console.log(this.estado);
    console.log('-----------');
    if (this.estado == 'false' && this.turno == this.uidJugador) {
      if (this.color == 'B') {
        if (pos != 'V' && pos != 'R' && pos != 'KR') {
          await this.envioInfoVerficarPosiblesMovimiento();
        }
      } else {
        if (this.color == 'R') {
          if (pos != 'V' && pos != 'B' && pos != 'KB') {
            await this.envioInfoVerficarPosiblesMovimiento();
          }
        }
      }
    } else if (this.estado == 'true') {
      if (pos == 'PV' && this.turno == this.uidJugador) {
        console.log();
        this.envioInfoActualizarTableroNuevoMovimiento();
        this.estado = 'false';
      }
    }
  }
}