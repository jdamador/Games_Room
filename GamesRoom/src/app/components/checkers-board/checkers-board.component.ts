import { Component, OnInit, OnDestroy } from '@angular/core';
import { CheckersService } from 'src/app/shared/services/checkers-service/checkers.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat-service/chat.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-checkers-board',
  templateUrl: './checkers-board.component.html',
  styleUrls: ['./checkers-board.component.css']
})
export class CheckersBoardComponent implements OnInit, OnDestroy {
  // All variables to handle control of game actions.
  idRoom: any;
  uidPlayer: string;
  turn: string;
  board = [];
  xActual: string;
  yActual: string;
  winner: string;
  state = 'false';
  color: string;
  private session: any;
  type_piece = 'none';
  gameState: any;
  turnPlayer = '-';
  numWhite = 0;
  numRed = 0;
  level = 0;

  constructor(private checkersService: CheckersService, private authService: AuthService,
    private chat: ChatService, private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // When game start init a new connection and configure a game.
    this.session = this.checkersService.connectToServer();
    this.chat.setRoom(this.checkersService.getIdRoom()); // Set chat room.
    // Get actual user from local storage.
    const user = JSON.parse(localStorage.getItem('user'));
    this.uidPlayer = user['uid'];
    this.gameState = this.checkersService.getGameState();

    // If there isn't a game.
    if (this.gameState === undefined) {
      this.authService.Home();
    }
    if (this.gameState === false) {  // To create a new game.
      this.type_piece = this.checkersService.getPieceType();
      this.idRoom = this.checkersService.idRoom;
      this.sendInfoCreateBoard(this.idRoom);
    } else if (this.gameState === true) { // To join a new game.
      this.idRoom = this.checkersService.getIdRoomJoinGame();
      this.sendInfoCreateBoard(this.idRoom);
    } else if (this.gameState === 'bot') {
      this.checkersService.getIdRoom().subscribe(
        data => {
          this.level = this.checkersService.getLevel();
          this.type_piece = this.checkersService.getPieceType();
          this.level = data.idRoom;
          this.sendInfoCreateBoard(this.idRoom);
        },
        error => {
          console.log('Error getting information!');
        }
      );
    } else if (this.gameState === 'botRecover') {
      this.idRoom = this.checkersService.getIdRoomJoinGame();
      this.sendInfoCreateBoard(this.idRoom);
    }

    // Create an observer to get damas board.
    this.checkersService.getBoard(this.session, (data: any) => {
      this.board = data.board;
      this.idRoom = data.idRoom;
      this.turn = data.turn;
      this.color = data.color;
      this.type_piece = data.piece;
      this.numWhite = data.numWhite;
      this.numRed = data.numRed;
      this.level = data.level;
      this.winner = 'follow';
      if (this.color === 'B') {
        this.turnPlayer = 'White';
      } else {
        this.turnPlayer = 'Red';
      }
      if (this.turn === 'bot') {
        this.checkersService.sendBotMakePlay(this.session, {
          idSala: this.idRoom,
          jugador: this.uidPlayer,
          nivel: this.level
        });
      }
    });

    // Create an observer to get available movements.
    this.checkersService.getBoardNewMovement(this.session, (data: any) => {
      this.idRoom = data.idRoom;
      this.board = data.board;
      this.winner = data.winner;
      this.turn = data.turn;
      this.numWhite = data.numWhite;
      this.numRed = data.numRed;
      if (this.color === 'B') {
        this.turnPlayer = 'White';
      } else {
        this.turnPlayer = 'Red';
      }
      if (this.winner === 'follow') {
        if (this.gameState === 'bot' || this.gameState === 'botRecover') {
          // If is a bot turn get a new movement.
          this.checkersService.sendBotMakePlay(this.session, {
            idRoom: this.idRoom,
            player: this.uidPlayer,
            level: this.level
          });
        }
      }

    });

    // Get all possbile movements for a piece.
    this.checkersService.getPosiblesMovimientos(this.session, (data: any) => {
      this.board = data.board;
      this.idRoom = data.idRoom;
      this.winner = data.winner;
      this.turn = data.turn;
    });

    // Get a play make for the bot.
    this.checkersService.getBotPlay(this.session, (data: any) => {
      this.board = data.board;
      this.idRoom = data.idRoom;
      this.winner = data.winner;
      this.color = data.color;
      this.numWhite = data.numWhite;
      this.numRed = data.numRed;
      this.turn = data.turn;
      this.turnPlayer = 'White';
    });

  }

  // Event trow when a windows is close.
  ngOnDestroy() {
    // Disconnect the session.
    this.checkersService.disconnectSession(this.session,
      {
        idRoom: this.idRoom,
        player: this.uidPlayer,
        level: this.level
      }
    );
  }

  // Set information to service to create a board.
  sendInfoCreateBoard(id: string) {
    this.checkersService.sendInfoCreateBoard(this.session, {
      idRoom: id,
      player: this.uidPlayer,
      type: this.type_piece,
      level: this.level,
    });
    if (this.gameState === true) {
      this.checkersService.deleteAvailable().subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log('Error getting data!');
        }
      );
    }


  }

  // Sent information to a service to get all available movements for a piece.
  async sentInfoVerifyPossiblesMovements() {
    if (this.turn === this.uidPlayer) {
      this.checkersService.sendInfoPossibleMove(this.session, {
        jugador: this.uidPlayer,
        idSala: this.idRoom,
        x: this.xActual,
        y: this.yActual
      });
      this.state = 'true';
    } else {
      console.log('It\'s not your turn');
    }
  }

  // Sent information to service to update the table with a new movement.
  async sendInfoUpdateBoardNewMovement() {
    if (this.turn === this.uidPlayer) {
      this.checkersService.sendUpdateBoardNewMove(
        this.session,
        { idSala: this.idRoom, x: this.xActual, y: this.yActual }
      );
    } else {
      console.log('no es su turno');
    }
  }

  async function(row, col) {
    if (this.winner !== 'sigue') {
      this.snackBar.open(this.winner, 'STATE', {
        duration: 2000,
      });
      this.authService.Home();
    } else {
      if (this.xActual === row && this.yActual === col) {
        // Get last board.
        this.checkersService.getOlderBoard(this.idRoom).subscribe(
          data => {
            this.board = data.board;
            this.state = 'false';
          },
          error => {
            console.log('Error getting data!');
          }
        );
      } else {
        this.xActual = row;
        this.yActual = col;
        const pos = this.board[this.xActual][this.yActual];
        if (this.state === 'false' && this.turn === this.uidPlayer) {
          if (this.color === 'B') {
            if (pos !== 'V' && pos !== 'R' && pos !== 'KR') {
              await this.sentInfoVerifyPossiblesMovements();
            }
          } else {
            if (this.color === 'R') {
              if (pos !== 'V' && pos !== 'B' && pos !== 'KB') {
                // Verify possible movements.
                await this.sentInfoVerifyPossiblesMovements();
              }
            }
          }
        } else if (this.state === 'true') {
          if (pos === 'PV' && this.turn === this.uidPlayer) {
            console.log();
            // Update board with a new movement.
            this.sendInfoUpdateBoardNewMovement();
            this.xActual = '-1';
            this.yActual = '-1';
            this.state = 'false';
          }
        }
      }
    }


  }
}