import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfigGameIAComponent } from '../config-game-ia/config-game-ia.component';
import { ConfigGamePlayersComponent } from '../config-game-players/config-game-players.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  gameType = 'lobby';
  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.gameType = 'lobby';
  }

  openSettingsIA(gameType): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = gameType;
    const dialogRef = this.dialog.open(ConfigGameIAComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.gameType = result;
      console.log(this.gameType);
    });
  }
  openSettingPlayers(gameType): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = gameType;
    const dialogRef = this.dialog.open(
      ConfigGamePlayersComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(result => {
      this.gameType = result;
      console.log(this.gameType);
    });
  }
}
