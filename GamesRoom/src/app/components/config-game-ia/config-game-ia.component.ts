import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-config-game-ia',
  templateUrl: './config-game-ia.component.html',
  styleUrls: ['./config-game-ia.component.css']
})
export class ConfigGameIAComponent implements OnInit {
  checkers_levels: any;
  gameType = 'lobby';
  constructor(
    public dialogRef: MatDialogRef<ConfigGameIAComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
  onClose() {
    this.dialogRef.close();
  }
  onSubmitNewGame() {
    this.gameType = this.data;
    this.dialogRef.close();
  }
}
