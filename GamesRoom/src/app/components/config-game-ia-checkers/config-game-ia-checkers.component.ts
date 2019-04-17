import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CheckersService } from 'src/app/shared/services/checkers-service/checkers.service';


@Component({
  selector: 'app-config-game-ia-checkers',
  templateUrl: './config-game-ia-checkers.component.html',
  styleUrls: ['./config-game-ia-checkers.component.css']
})
export class ConfigGameIaCheckersComponent implements OnInit {
  checkers_levels: any;
  pieces_type: any;

  constructor(
    public checkersService: CheckersService,
    public authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<ConfigGameIaCheckersComponent>) {}

  ngOnInit() {}
  onClose() {
    this.dialogRef.close();
  }

  jugarCheckers(){
    this.checkersService.setEstadoJuego("bot");
    this.checkersService.setLevel(this.checkers_levels);
    this.checkersService.setPieceType(this.pieces_type);
    this.authService.goCheckers();
    this.onClose();
  }
}
