import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfigGameIAComponent } from '../config-game-ia/config-game-ia.component';
import { ConfigGamePlayersMemoryComponent } from '../config-game-players-memory/config-game-players.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  checkers_levels: any;
  memory_levels: any;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private dialog: MatDialog
  ) { }
  ngOnInit() { }

  openSettingsIA(tipo: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ConfigGameIAComponent, dialogConfig);
  }
  openSettingPlayers(tipo: string): void {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    // this.dialog.open(ConfigGamePlayersComponent, dialogConfig);
    if (tipo === 'checkers') {
      this.authService.goCheckers();
    }
  }
  openSettingsIAMemory(type) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = type;
    this.dialog.open(ConfigGameIAComponent, dialogConfig);
  }

  openSettingPlayersMemory(tipo: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = tipo;
    const dialogRef = this.dialog.open(
      ConfigGamePlayersMemoryComponent,
      dialogConfig
    );
  }
}
