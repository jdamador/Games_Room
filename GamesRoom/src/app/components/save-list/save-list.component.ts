import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SaveListDataSource } from './save-list-datasource';
import { SaveGamesService } from 'src/app/shared/services/save-games-service/save-games.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CheckersService } from 'src/app/shared/services/checkers-service/checkers.service';
import { MemoryService } from 'src/app/shared/services/memory/memory.service';

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
    public authService: AuthService, public checkersService: CheckersService,
    public memoryService: MemoryService) { }

  // Get save list when start the window.
  ngOnInit() {
    this.startTrackingLoop();
    this.getGames();

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  startTrackingLoop() {
    this.intervalo = setInterval(() => {
      this.getGames();
    }, 1000);
  }
  stopTrackingLoop() {
    clearInterval(this.intervalo);
    this.intervalo = null;
  }

  // Get save games.
  getGames() {
    const user = JSON.parse(localStorage.getItem('user'));
    const player = this.authService.userInfo().uid;
    const name = user['displayName'];
    this.gamesSaved.getSaveGames(player, name).subscribe(
      data => {
        this.dataSource = data;
      },
      error => {
        console.log('Error getting data! ' + error);
      }
    );
  }

  // Delete a save game.
  deleteGame(game) {
    const user = JSON.parse(localStorage.getItem('user'));
    const player = user['uid'];
    const key = game['keyEliminar'];
    const id = game['id'];
    this.gamesSaved.deleteGame(player, key, id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log('Error getting data! ' + error);
      }
    );
  }

  // Charge a game save.
  chargeGame(game) {
    console.log(game);
    const tipo = game['name'];
    if (tipo === 'Checkers') {
      // If is a checkers game charge.
      const key = game['keyDelete'];
      const id = game['id'];
      const level = game['level'];
      const join = { 'idRoom': id, 'keyDelete': key };
      const piece = game['piece'];
      this.checkersService.setIdRoomJoinGame(join);
      this.checkersService.setGameState('botRecover');
      this.checkersService.setLevel(level);
      this.checkersService.setPieceType(piece);
      this.authService.goCheckers();
    } else {
      // If is a memory game charge it.
      this.memoryService.setGameObtained(game['id']);
      this.memoryService.boardType = 'IA';
      this.authService.goMemory();
    }
  }
}
