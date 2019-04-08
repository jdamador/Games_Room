import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {
  MatDialogRef,
  MatTableDataSource,
  MatPaginator
} from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { SessionService } from 'src/app/shared/services/sessionservice/session.service';

@Component({
  selector: 'app-config-game-players',
  templateUrl: './config-game-players.component.html',
  styleUrls: ['./config-game-players.component.css']
})
export class ConfigGamePlayersComponent implements OnInit{
  // Table format
  displayedColumns = ['user', 'created', 'number of players', 'join'];
  gameTable = new MatTableDataSource<any>();
  constructor(
    public dialogRef: MatDialogRef<ConfigGamePlayersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private session: SessionService
  ) {}

  // Get all sesions
  ngOnInit() {
    this.session.getAllSessions().subscribe(
      (sessions: any[]) => {
        const formedData = [];
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

  gameType = 'lobby';
  showRooms = false;

  onClose() {
    this.dialogRef.close(this.gameType);
  }
  showGames() {
    if (this.showRooms) {
      this.showRooms = false;
    } else {
      this.showRooms = true;
    }
  }
  onSubmitNewGame() {
    this.gameType = this.data;
    this.dialogRef.close(this.gameType);
  }
}
