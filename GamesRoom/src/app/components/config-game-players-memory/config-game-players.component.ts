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
  displayedColumns = ['user', 'number of players', 'join'];
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
    // Create a new session to play with another player.
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
  // Close modal pop up.
  onClose() {
    this.dialogRef.close();
  }
  // Show available rooms.
  showGames() {
    if (this.showRooms) {
      this.showRooms = false;
    } else {
      this.showRooms = true;
    }
  }
  // Create a new game.
  onSubmitNewGame() {
    this.setBoardSize();
    this.socket.setGameType('Players');
    const userInfo = this.authService.userData;
    const newGame: NewSession = {
      name: '',
      user: userInfo.displayName,
      numberOfPlayers: 1
    };
    // Create a new session.
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
  // Join to a session.
  joinGame(id: string) {
    this.dialogRef.close();
    this.router.navigate([`/memory/`, id]);
  }
  // Config the game level.
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
