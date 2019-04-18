import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SaveListDataSource } from './save-list-datasource';
import { SaveGamesService } from 'src/app/shared/services/save-games-service/save-games.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CheckersService } from 'src/app/shared/services/checkers-service/checkers.service';

@Component({
  selector: 'app-save-list',
  templateUrl: './save-list.component.html',
  styleUrls: ['./save-list.component.css']
})
export class SaveListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<any>();
  intervalo: any;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'nivel', 'player1', 'player2', 'delete', 'charge'];

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
      // run code
      this.obtenerPartida();
    }, 1000);
  }
  stopTrackingLoop() {
    clearInterval(this.intervalo);
    this.intervalo = null;
  }

  obtenerPartida() {
    const user = JSON.parse(localStorage.getItem('user'));
    const jugador = user['uid'];
    const nombre = user['displayName'];
    this.gamesSaved.getPartidasGuardadas(jugador, nombre).subscribe(
      data => {
        this.dataSource = data;

      },
      error => {
        console.log('error de consulta ' + error);
      }
    );
  }
  eliminarPartida(game) {
    const user = JSON.parse(localStorage.getItem('user'));
    const jugador = user['uid'];
    const key = game['keyEliminar'];
    const id = game['id'];
    this.gamesSaved.eliminarPartida(jugador, key, id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log('error de consulta ' + error);
      }
    );
  }

  cargarPartida(game) {
    const tipo = game['name'];
    if (tipo === 'Checkers') {
      const key = game['keyEliminar']
      const id = game['id'];
      const nivel = game['nivel'];
      const unir = { 'idSala': id, 'keyEliminar': key };
      const pieza = game['pieza'];
      this.checkersService.setidSalaUnirPartida(unir);
      this.checkersService.setEstadoJuego('botRecuperar');
      this.checkersService.setLevel(nivel);
      this.checkersService.setPieceType(pieza);
      this.authService.goCheckers();
    } else {
      console.log('Memory');
    }

  }

}
