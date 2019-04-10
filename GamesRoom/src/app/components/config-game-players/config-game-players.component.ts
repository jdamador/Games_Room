import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material'
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-config-game-players',
  templateUrl: './config-game-players.component.html',
  styleUrls: ['./config-game-players.component.css']
})
export class ConfigGamePlayersComponent implements OnInit {
  pieces_type: any;
  constructor(public dialogRef: MatDialogRef<ConfigGamePlayersComponent>, public authService: AuthService,) {}

  ngOnInit() {}
  onClose() {
    this.dialogRef.close();
  }

  jugarCheckers(){
    this.authService.goCheckers();
    console.log(this.pieces_type);
    this.onClose();
  }
}
