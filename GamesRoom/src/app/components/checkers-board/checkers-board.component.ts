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
    x = "4";
    y = "6";
    tableroUsuario = [];


  constructor(private checkersService: CheckersService) { }

  ngOnInit() {
    this.envioInfoCrearTablero();
    this.checkersService.getTablero()
      .subscribe((data) => {
        this.idSala = data.idSala;
        this.tablero = data.tablero;
        console.log("Tablero:" + this.tablero)
      });
    }

  //Envia información hacia el servicio para crear el tablero
  envioInfoCrearTablero(){
    this.checkersService.envioInfoCrearTablero({"jugador1": this.uidJugador1, "jugador2":this.uidJugador2});
  }

  //Envia información hacia el servicio para verificar los posible movimientos de una ficha
  envioInfoVerficarPosibleMovimiento(){
    this.checkersService.envioInfoPosibleMovimiento({"jugador": this.uidJugador1, "idSala":this.idSala, "x": this.x, "y":this.y})
  }

  //Obtiene del servicio los posibles movimientos de una ficha
  getPosiblesMovimientos(){
    this.checkersService.getPosiblesMovimientos()
    .subscribe((data)=>{
      this.idSala = data.idSala;
      this.tableroUsuario = data.tablero;
      console.log("Tablero Usuario:" + this.tableroUsuario)
    })
  }
  

  click(){
    alert('Hizo click...');
  }
}
