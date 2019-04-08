import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-config-game-players',
  templateUrl: './config-game-players.component.html',
  styleUrls: ['./config-game-players.component.css']
})
export class ConfigGamePlayersComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfigGamePlayersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  gameType = 'lobby';
  showRooms = false;
  ngOnInit() {}

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
