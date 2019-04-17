import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  MatDialogRef,
  MatTableDataSource,
  MatPaginator
} from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { NewSession } from 'src/app/interfaces/table/table.module';
import { SessionService } from 'src/app/shared/services/sessionservice/session.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { MemoryService } from 'src/app/shared/services/memory/memory.service';

@Component({
  selector: 'app-config-game-players',
  templateUrl: './config-game-players.component.html',
  styleUrls: ['./config-game-players.component.css']
})
export class ConfigGamePlayersMemoryComponent implements OnInit, AfterViewInit {
  // Configure the table columns.
  displayedColumns = ['user', 'created', 'number of players', 'join'];
  gameTable = new MatTableDataSource<NewSession>();
  showRooms = false;
  memory_levels = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public session: SessionService,
    public authService: AuthService,
    private router: Router,
    private socket: MemoryService,
    public dialogRef: MatDialogRef<ConfigGamePlayersMemoryComponent>,
  ) {
  }
  ngOnInit() {
    this.session.getAllSessions().subscribe(
      (sessions: NewSession[]) => {
        console.log(sessions);
        let formedData = [];
        // tslint:disable-next-line:forin
        for (let key in sessions) {
          sessions[key]['id'] = key;
          console.log(sessions[key]['id']);
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
  onClose() {
    this.dialogRef.close();
  }

  showGames() {
    if (this.showRooms) {
      this.showRooms = false;
    } else {
      this.showRooms = true;
    }
  }
  onSubmitNewGame(gameID: string) {
    this.setBoardSize();
    const userInfo = this.authService.userData;
    const newGame: NewSession = {
      name: gameID,
      created: new Date(),
      user: userInfo.displayName,
      numberOfPlayers: 1
    };

    this.session.createSession(newGame).subscribe(
      (data: any) => {
        this.dialogRef.close();
        this.router.navigate([`/memory/`, data.name]);
      },
      err => {
        console.log(err);
      }
    );
  }

  joinGame(id: string) {
    this.dialogRef.close();
    this.router.navigate([`/memory/`, id]);
  }
  setBoardSize() {
    console.log(this.memory_levels);
    if (this.memory_levels === 'hard') {
      this.socket.setBoardSize(18);
    } else if (this.memory_levels === 'medium') {
      this.socket.setBoardSize(15);
    } else {
      this.socket.setBoardSize(10);
    }
  }
}
