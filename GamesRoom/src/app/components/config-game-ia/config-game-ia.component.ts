import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-config-game-ia',
  templateUrl: './config-game-ia.component.html',
  styleUrls: ['./config-game-ia.component.css']
})
export class ConfigGameIAComponent implements OnInit {
  checkers_levels: any;
  constructor(
    public dialogRef: MatDialogRef<ConfigGameIAComponent>
  ) { }

  ngOnInit() {
  }
  onClose() {
    this.dialogRef.close();
  }
}
