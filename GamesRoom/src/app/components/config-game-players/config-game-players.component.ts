import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-config-game-players',
  templateUrl: './config-game-players.component.html',
  styleUrls: ['./config-game-players.component.css']
})
export class ConfigGamePlayersComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfigGamePlayersComponent>) {}

  ngOnInit() {}
  onClose() {
    this.dialogRef.close();
  }
}
