import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material'
import { AuthService } from "../../shared/services/auth.service";
import { CheckersService } from "src/app/shared/services/checkers-service/checkers.service";

@Component({
  selector: 'app-config-game-players-checkers',
  templateUrl: './config-game-players-checkers.component.html',
  styleUrls: ['./config-game-players-checkers.component.css']
})
export class ConfigGamePlayersCheckersComponent implements OnInit {
  public pieces_type: any;
  constructor(public dialogRef: MatDialogRef<ConfigGamePlayersCheckersComponent>, public authService: AuthService, public checkersService: CheckersService) {}

  ngOnInit() {}
  onClose() {
    this.dialogRef.close();
  }

  jugarCheckers(){
    console.log("Config: " + this.pieces_type)
    this.checkersService.setPieceType(this.pieces_type);
    this.authService.goCheckers();
    this.onClose();
  }
}
