import { Component, OnInit, OnDestroy } from '@angular/core';
import { MemoryService } from 'src/app/shared/services/memory/memory.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material';
import { RematchComponent } from './rematch.component';
import { PlayerLeftComponent } from './player-left.component';

export interface GameProgress {
  players: string[];
  currentPlayer: string;
  board: [];
  roomId: string;
  winner: string;
}

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
  private gameProgress: GameProgress;
  private user: any;
  private onGoingGame: boolean;
  // Cards will be show in the game board.
  board: [];
  enableClick: boolean;

  // Default image, it is shows when the card is not flipped.
  images_inact = '/assets/Memory/poker.png';

  constructor(
    private memoryService: MemoryService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.user = {
      name: this.authService.userData.email,
      assignedNumber: undefined
    };
    // Connect to server who contains the api rest functions.
    this.session = this.memoryService.connectToServer(this.gameSession);
    // Wait until a player join to the room.
    this.memoryService.waitingForOpponent(
      this.session,
      (opponentFound: boolean) => {
        this.onGoingGame = opponentFound;
      }
    );

    this.memoryService.gameUpdated(this.session, (gameStatus: GameProgress) => {
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
            this.router.navigate(['/home']);
          }
        });
      }
      if (gameStatus.currentPlayer === this.user.name) {
        this.enableClick = true;
      }
      this.gameProgress = gameStatus;
      this.user.assignedNumber =
        this.gameProgress.players.indexOf(this.user.name) + 1;
      this.board = this.gameProgress.board;
    });

    this.memoryService.disconnect(this.session, (opponentLeft: string) => {
      const dialogRef = this.dialog.open(PlayerLeftComponent, {
        data: {
          opponentInfo: opponentLeft
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/home']);
      });
    });
  }
  ngOnDestroy(): void {
    this.memoryService.disconnectSession(this.session);
  }
  // TODO: make validatios to board.

  public card_selected(position: number) {
    console.log(this.gameProgress);
  }

  private playerMove(gameProgress: GameProgress) {
    this.memoryService.playerMove(this.session, gameProgress);
  }
}
