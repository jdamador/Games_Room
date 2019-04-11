import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-config-game-ia-checkers',
  templateUrl: './config-game-ia-checkers.component.html',
  styleUrls: ['./config-game-ia-checkers.component.css']
})
export class ConfigGameIaCheckersComponent implements OnInit {
  checkers_levels: any;
  pieces_type: any;
  constructor(public dialogRef: MatDialogRef<ConfigGameIaCheckersComponent>) {}

  ngOnInit() {}
  onClose() {
    this.dialogRef.close();
  }
}
