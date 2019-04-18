import { Component, OnInit, OnDestroy } from '@angular/core';
import { CheckersService } from 'src/app/shared/services/checkers-service/checkers.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat-service/chat.service';

@Component({
  selector: 'app-checkers-board',
  templateUrl: './checkers-board.component.html',
  styleUrls: ['./checkers-board.component.css']
})
export class CheckersBoardComponent implements OnInit, OnDestroy {
  idSala: any;
  uidJugador: string;
  turno: string;
  tablero = [];
  xActual: string;
  yActual: string;
  ganador: string;
  estado = 'false';
  color: string;
  private session: any;
  type_piece = 'none';
  estadoJuego: any;
  turnoJugador = '-';
  numBlancas = 0;
  numRojas = 0;

  nivel = 0;

  constructor(private checkersService: CheckersService, private authService: AuthService,
    private chat: ChatService
  ) { }

  ngOnInit() {
    this.session = this.checkersService.connectToServer();
    this.chat.setSala(this.checkersService.getidSala());
    const user = JSON.parse(localStorage.getItem('user'));
    this.uidJugador = user['uid'];
    this.estadoJuego = this.checkersService.getEstadoJuego();
    if (this.estadoJuego === undefined) {
      this.authService.Home();
    }
    if (this.estadoJuego === false) { // Para crear una nueva partida
      this.type_piece = this.checkersService.getPieceType();
      this.idSala = this.checkersService.idSala;
      this.envioInfoCrearTablero(this.idSala);
    } else if (this.estadoJuego === true) { // Para unirse a una partida
      this.idSala = this.checkersService.getidSalaUnirPartida();
      this.envioInfoCrearTablero(this.idSala);
    } else if (this.estadoJuego === 'bot') {
      this.checkersService.getidSala().subscribe(
        data => {
          this.nivel = this.checkersService.getLevel();
          this.type_piece = this.checkersService.getPieceType();
          this.idSala = data.idSala;
          this.envioInfoCrearTablero(this.idSala);
        },
        error => {
          console.log('Error en la consulta');
        }
      );
    } else if (this.estadoJuego === 'botRecuperar') {
      this.idSala = this.checkersService.getidSalaUnirPartida();
      this.envioInfoCrearTablero(this.idSala);
    }

    this.checkersService.getTablero(this.session, (data: any) => {
      this.tablero = data.tablero;
      this.idSala = data.idSala;
      this.turno = data.turno;
      this.color = data.color;
      this.type_piece = data.pieza;
      this.numBlancas = data.numBlancas;
      this.numRojas = data.numRojas;
      this.nivel = data.nivel;
      if (this.color === 'B') {
        this.turnoJugador = 'Blancas';
      } else {
        this.turnoJugador = 'Rojas';
      }
    });

    this.checkersService.getTableroNuevoMovimiento(this.session, (data: any) => {
      this.idSala = data.idSala;
      this.tablero = data.tablero;
      this.ganador = data.ganador;
      this.turno = data.turno;
      this.numBlancas = data.numBlancas;
      this.numRojas = data.numRojas;
      if (this.color === 'B') {
        this.turnoJugador = 'Blancas';
      } else {
        this.turnoJugador = 'Rojas';
      }
      if (this.estadoJuego === 'bot') {
        this.checkersService.envioBotHacerJugada(this.session, {
          idSala: this.idSala,
          jugador: this.uidJugador,
          nivel: this.nivel
        });
      }
    });

    this.checkersService.getPosiblesMovimientos(this.session, (data: any) => {
      this.tablero = data.tablero;
      this.idSala = data.idSala;
      this.ganador = data.ganador;
      this.turno = data.turno;

    });

    this.checkersService.obtenerJugadaBot(this.session, (data: any) => {
      this.tablero = data.tablero;
      this.idSala = data.idSala;
      this.ganador = data.ganador;
      this.color = data.color;
      this.numBlancas = data.numBlancas;
      this.numRojas = data.numRojas;
      this.turno = data.turno;
      this.turnoJugador = 'Blancas';
    });

  }

  ngOnDestroy() {
    this.checkersService.disconnectSession(this.session,
      {
        idSala: this.idSala,
        jugador: this.uidJugador,
        nivel: this.nivel
      }
    );
  }

  // Envia información hacia el servicio para crear el tablero
  envioInfoCrearTablero(id: string) {
    this.checkersService.envioInfoCrearTablero(this.session, {
      idSala: id,
      jugador: this.uidJugador,
      tipo: this.type_piece,
      nivel: this.nivel
    });
    if (this.estadoJuego === true) {
      this.checkersService.eliminarDisponible().subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log('Error en la consulta');
        }
      );
    }


  }

  // Envia información hacia el servicio para verificar los posible movimientos de una ficha
  async envioInfoVerficarPosiblesMovimiento() {
    if (this.turno === this.uidJugador) {
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

  // Envia información hacia el servicio para actualizar la tabla con un nuevo movimiento
  async envioInfoActualizarTableroNuevoMovimiento() {
    if (this.turno === this.uidJugador) {
      this.checkersService.envioInfoActualizarTableroNuevoMovimiento(
        this.session,
        { idSala: this.idSala, x: this.xActual, y: this.yActual }
      );
    } else {
      console.log('no es su turno');
    }
  }

  async function(row, col) {
    if (this.xActual === row && this.yActual === col) {
      this.checkersService.getTableroAntiguo(this.idSala).subscribe(
        data => {
          this.tablero = data.Tablero;
          this.estado = 'false';
        },
        error => {
          console.log('Error en la consulta');
        }
      );
    } else {
      this.xActual = row;
      this.yActual = col;
      var pos = this.tablero[this.xActual][this.yActual];
      // console.log('-----------');
      // console.log(this.color);
      // console.log(this.uidJugador);
      // console.log(this.turno);
      // console.log(this.estado);
      // console.log('-----------');
      if (this.estado === 'false' && this.turno === this.uidJugador) {
        if (this.color === 'B') {
          if (pos !== 'V' && pos !== 'R' && pos !== 'KR') {
            await this.envioInfoVerficarPosiblesMovimiento();
          }
        } else {
          if (this.color === 'R') {
            if (pos !== 'V' && pos !== 'B' && pos !== 'KB') {
              await this.envioInfoVerficarPosiblesMovimiento();
            }
          }
        }
      } else if (this.estado === 'true') {
        if (pos === 'PV' && this.turno === this.uidJugador) {
          console.log();
          this.envioInfoActualizarTableroNuevoMovimiento();
          this.xActual = '-1';
          this.yActual = '-1';
          this.estado = 'false';
        }
      }
    }

  }
}
