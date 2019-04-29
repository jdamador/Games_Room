import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MatPaginator } from '@angular/material'
import { AuthService } from "../../shared/services/auth.service";
import { CheckersService } from "src/app/shared/services/checkers-service/checkers.service";
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { SessionService } from 'src/app/shared/services/sessionservice/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-game-players-checkers',
  templateUrl: './config-game-players-checkers.component.html',
  styleUrls: ['./config-game-players-checkers.component.css']
})
export class ConfigGamePlayersCheckersComponent implements OnInit, AfterViewInit {
  public pieces_type: any;
  newGame = false;
  showRooms = false;
  displayedColumns = ['Sala', 'id User', 'join'];
  gameTable = new MatTableDataSource<any>();
  gameType = 'lobby';
  gameState = false; // If is false, create a new room; if is true, join to an exist room.

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public session: SessionService,
    public authService: AuthService,
    public dialogRef: MatDialogRef<ConfigGamePlayersCheckersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public checkersService: CheckersService) {
    this.gameType = data;
  }

  ngOnInit() {
    this.checkersService.getSesiones().subscribe(
      (sessions: any[]) => {
        let formedData = [];
        // tslint:disable-next-line:forin
        for (let key in sessions) {
          sessions[key]['id'] = key;
          formedData.push(sessions[key]);
        }
        this.gameTable.data = formedData;
      },
      err => {
        console.log(err);
      }
    );

  }

  ngAfterViewInit() {
    this.gameTable.paginator = this.paginator;
  }

  // Show games available to join.
  showGames() {
    if (this.showRooms) {
      this.showRooms = false;
    } else {
      this.showRooms = true;
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  // Configure all thing to play checkers.
  configGameCheckers() {
    if (this.newGame) {
      this.newGame = false;
    } else {
      this.newGame = true;
    }
  }

  // Start a new checkers game.
  playCheckers() {
    this.checkersService.getIdRoom().subscribe(
      data => {
        this.checkersService.idRoom = data.idRoom;
        this.checkersService.setGameState(this.gameState);
        this.checkersService.setPieceType(this.pieces_type);
        this.authService.goCheckers();
        this.onClose();
      },
      error => {
        console.log('Error getting data.');
      }
    );
  }

  // Join to a game.
  joinGame(user) {
    this.gameState = true;
    this.checkersService.setGameState(this.gameState);
    this.checkersService.setIdRoomJoinGame(user);
    this.dialogRef.close();
    this.authService.goCheckers();
  }
}
