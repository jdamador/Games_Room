import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort,MatTableDataSource } from '@angular/material';
import { SaveListDataSource } from './save-list-datasource';
import { SaveGamesService } from 'src/app/shared/services/save-games-service/save-games.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CheckersService } from 'src/app/shared/services/checkers-service/checkers.service';

@Component({
  selector: 'app-save-list',
  templateUrl: './save-list.component.html',
  styleUrls: ['./save-list.component.css']
})
export class SaveListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<any>();
  intervalo: any
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'nivel' , 'player1', 'player2', 'delete', 'charge'];

  constructor(public gamesSaved: SaveGamesService,
    public authService: AuthService, public checkersService: CheckersService) { }

  ngOnInit() {
    this.startTrackingLoop();
    this.obtenerPartida(); 
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  startTrackingLoop() {
    this.intervalo = setInterval(() => {
        //run code
        this.obtenerPartida()
    }, 1000);
  }
  stopTrackingLoop() {
      clearInterval(this.intervalo);
      this.intervalo = null;
   }

  obtenerPartida(){
    const user = JSON.parse(localStorage.getItem('user'));
    var jugador= user['uid'];
    var nombre = user['displayName'];
    this.gamesSaved.getPartidasGuardadas(jugador, nombre).subscribe(
      data => {
          this.dataSource= data

      },
      error => {
        console.log('error de consulta ' + error);
      }
    );
  }
  eliminarPartida(game){
    const user = JSON.parse(localStorage.getItem('user'));
    var jugador= user['uid'];
    var key= game['keyEliminar']
    var id= game['id']
    this.gamesSaved.eliminarPartida(jugador, key, id).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log('error de consulta ' + error);
      }
    );
  }

  cargarPartida(game){
    var tipo = game['name'];
    if(tipo=='Checkers'){
      var key= game['keyEliminar']
      var id= game['id']
      var nivel= game['nivel']
      var unir= {"idSala": id, "keyEliminar": key}
      var pieza = game['pieza']
      this.checkersService.setidSalaUnirPartida(unir)
      this.checkersService.setEstadoJuego("botRecuperar");
      this.checkersService.setLevel(nivel);
      this.checkersService.setPieceType(pieza);
      this.authService.goCheckers();
    }
    else{
      console.log('Memory')
    }
    
  }

}
