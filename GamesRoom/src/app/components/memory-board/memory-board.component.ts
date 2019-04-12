import { Component, OnInit, OnDestroy } from '@angular/core';
import { MemoryService } from 'src/app/shared/services/memory/memory.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RematchComponent } from './rematch.component';
import { PlayerLeftComponent } from './player-left.component';

export interface User {
  name: string;
  assignedNumber: number;
}

@Component({
  selector: 'app-memory-board',
  templateUrl: './memory-board.component.html',
  styleUrls: ['./memory-board.component.css']
})
export class MemoryBoardComponent implements OnInit, OnDestroy {
  private gameSession = this.router.url.replace('/memory/', '');
  private session: any;
  private gameProgress: any;
  private user: User = (this.user = {
    name: this.authService.userInfo().displayName,
    assignedNumber: undefined
  });
  private onGoingGame: boolean;
  // Cards will be show in the game board.
  board: any[];
  // Default image, it is shows when the card is not flipped.
  images_inact = '/assets/Memory/poker.png';

  constructor(
    private memoryService: MemoryService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log(this.user);
    // Connect to server who contains the api rest functions.
    this.session = this.memoryService.connectToServer(this.gameSession, 15);

    // Wait until a player join to the room.
    this.memoryService.waitingForOpponent(
      this.session,
      (opponentFound: boolean) => {
        this.onGoingGame = opponentFound;
      }
    );
    this.memoryService.gameUpdated(this.session, (gameStatus: any) => {
      this.onGoingGame = true;
      if (gameStatus.players.length === 1) {
        console.log(
          `Opponent ${gameStatus.players[0]} is waiting for rematch `
        );
        const dialogRef = this.dialog.open(RematchComponent, {
          data: {
            opponentName: 'Do you want a rematch?'
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
          } else {
            this.router.navigate(['home']);
          }
        });
      }
      this.gameProgress = gameStatus;
      this.board = this.gameProgress.board;
    });

    this.memoryService.disconnect(this.session, (opponentLeft: string) => {
      const dialogRef = this.dialog.open(PlayerLeftComponent, {
        data: {
          opponentInfo: opponentLeft
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['home']);
      });
    });
  }
  public card_selected(index: number) {
    console.log(this.gameProgress);
    if (this.gameProgress.currentPlayer === this.user.name) {
      if (!this.gameProgress.board[index].visible) {
        this.gameProgress.index = index;
        this.playerMove(this.gameProgress);
      } else {
        this.snackBar.open('Este espacio ya ha sido seleccionado, escoja otro.', null, {
          duration: 3000
        });
      }
    } else {
      this.snackBar.open('Es turno del jugador rival', null, {
        duration: 3000
      });
    }
  }
  private playerMove(gameProgress: any) {
    this.memoryService.playerMove(this.session, gameProgress);
  }
  ngOnDestroy(): void {
    this.router.navigate(['home']);
  }
}
