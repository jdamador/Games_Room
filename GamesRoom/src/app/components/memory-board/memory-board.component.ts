import { Component, OnInit, OnDestroy } from '@angular/core';
import { MemoryService } from 'src/app/shared/services/memory/memory.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { StatisticsService } from 'src/app/shared/services/statistics-service/statistics.service';

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
    private snackBar: MatSnackBar,
    private statisticService: StatisticsService
  ) { }

  ngOnInit() {

    // Connect to server who contains the api rest functions.
    this.session = this.memoryService.connectToServer(this.gameSession);

    // Wait until a player join to the room.
    this.memoryService.waitingForOpponent(
      this.session,
      (opponentFound: boolean) => {
        this.onGoingGame = opponentFound;
      }
    );
    // Update the game when some change is make.
    this.memoryService.gameUpdated(this.session, (gameStatus: any) => {
      this.onGoingGame = true;
      this.gameProgress = gameStatus;
      this.board = this.gameProgress.board;
      if (this.gameProgress.currentPlayer === 'Jarvis_Bot') {
        this.playerMove(this.gameProgress);
      }
    });

    // Return to lobby if some player left the match.
    this.memoryService.disconnect(this.session, (opponentLeft: string) => {
      this.router.navigate(['home']);
    });
    // Validate when the game was complete and show a message for each player.
    this.memoryService.gameOver(this.session, (gameOver: any) => {
      if (gameOver === '*') {
        this.statisticService.postDraw();
        this.snackBar.open('¡Has empatado la partida!', null, {
          duration: 3000
        });
      } else
        if (gameOver === this.user.name) {
          this.statisticService.postWin();
          this.snackBar.open(`¡Felicitaciones ${this.user.name}, has ganado la partida!`, null, {
            duration: 3000
          });
        } else {
          this.statisticService.postDefeat();
          this.snackBar.open(`Lo sentimos ${this.user.name}, has perdido la partida!`, null, {
            duration: 3000
          });
        }
    });
  }

  // Validate when some player pick a card.
  public card_selected(index: number) {

    // Validate if is your turn.
    if (this.gameProgress.currentPlayer === this.user.name) {
      // Validate if the card was not picked before.
      if (!this.gameProgress.board[index].visible) {
        this.gameProgress.index = index;
        // Send game process to validate the move.
        this.playerMove(this.gameProgress);
      } else {
        // Show a message if that card was selected before.
        this.snackBar.open('Este espacio ya ha sido seleccionado, escoja otro.', null, {
          duration: 3000
        });
      }
    } else {
      // Show a message if isn't your turn.
      this.snackBar.open('Es turno del jugador rival', null, {
        duration: 3000
      });
    }
  }
  // Call backend to check the move and flipped the cards.
  private playerMove(gameProgress: any) {
    this.memoryService.playerMove(this.session, gameProgress);
  }
  // If the window is closed go to home.
  ngOnDestroy(): void {
    this.router.navigate(['home']);
  }
}
