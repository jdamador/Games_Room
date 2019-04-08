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

@Component({
  selector: 'app-config-game-players',
  templateUrl: './config-game-players.component.html',
  styleUrls: ['./config-game-players.component.css']
})
export class ConfigGamePlayersComponent implements OnInit, AfterViewInit {
  // Configure the table columns.
  displayedColumns = ['user', 'created', 'number of players', 'join'];
  gameTable = new MatTableDataSource<NewSession>();
  showRooms = false;
  gameType = 'lobby';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public session: SessionService,
    public authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<ConfigGamePlayersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.gameType = data;
  }
  ngOnInit() {
    this.session.getAllSessions().subscribe(
      (sessions: NewSession[]) => {
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
    const userInfo = this.authService.userData;
    const newGame: NewSession = {
      name: gameID,
      created: new Date(),
      user: userInfo.email,
      numberOfPlayers: 1
    };

    this.session.createSession(newGame).subscribe(
      (data: any) => {
        this.dialogRef.close();
        this.router.navigate([`/${this.gameType}/`, data.name]);
      },
      err => {
        console.log(err);
      }
    );
  }
  joinGame(id: string) {
    this.dialogRef.close();
    this.router.navigate([`/${this.gameType}/`, id]);
  }
}
