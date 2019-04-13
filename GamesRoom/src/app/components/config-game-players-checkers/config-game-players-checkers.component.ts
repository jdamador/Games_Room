import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef,  MatTableDataSource,  MatPaginator } from '@angular/material'
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
export class ConfigGamePlayersCheckersComponent implements OnInit {
  public pieces_type: any;
  newGame = false;
  showRooms = false;
  displayedColumns = ['Sala', 'id User', 'join'];
  gameTable = new MatTableDataSource<any>();
  gameType = 'lobby';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public session: SessionService,
    public authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<ConfigGamePlayersCheckersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public checkersService: CheckersService) {

      this.gameType = data;

    }

  ngOnInit() {
    this.checkersService.getSesiones().subscribe(
      (sessions: any[]) => {
        console.log(sessions);
        let formedData = [];
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

  configGameCheckers(){
    if (this.newGame) {
      this.newGame = false;
    } else {
      this.newGame = true;
    }
  }

  jugarCheckers(){
    this.checkersService.setPieceType(this.pieces_type);
    this.authService.goCheckers();
    this.onClose();
  }

  joinGame(id: string) {
    this.dialogRef.close();
    this.router.navigate([`/${this.gameType}/`, id]);
  }
}
