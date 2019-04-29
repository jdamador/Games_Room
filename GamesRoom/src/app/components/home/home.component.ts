import { ConfigGameIaCheckersComponent } from '../config-game-ia-checkers/config-game-ia-checkers.component';
import { ConfigGamePlayersCheckersComponent } from '../config-game-players-checkers/config-game-players-checkers.component';
import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfigGamePlayersMemoryComponent } from '../config-game-players-memory/config-game-players.component';
import { ConfigGameIAComponent } from '../config-game-ia/config-game-ia.component';
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
  ) { }

  ngOnInit() { }

  // Open settings for IA Checkers.
  openSettingsIACheckers(tipo: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ConfigGameIaCheckersComponent, dialogConfig);
  }

  // Open settings for Player vs Player Checkers Game.
  openSettingPlayersCheckers(tipo: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ConfigGamePlayersCheckersComponent, dialogConfig);
  }
  // Open settings for a new memory game vs IA.
  openSettingsIAMemory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ConfigGameIAComponent, dialogConfig);
  }
  // Open settings for a new memory game vs a player.
  openSettingPlayersMemory(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ConfigGamePlayersMemoryComponent, dialogConfig);
  }
}
