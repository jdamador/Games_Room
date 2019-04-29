import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat-service/chat.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CheckersService } from 'src/app/shared/services/checkers-service/checkers.service';

@Component({
  selector: 'app-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.css']
})
export class ChatBoardComponent implements OnInit {
  currentRoom = 'room';
  message: string;
  messages = [];
  newMessage: string;
  author = 'roy';
  idRoom = '';

  constructor(private chatService: ChatService, private auth: AuthService) {
  }

  ngOnInit() {
    // Get default data from services.
    this.idRoom = this.chatService.getRoom();
    this.author = this.auth.userInfo().displayName;
    // this.idSala = this.checkersService.idSala;
    const user = JSON.parse(localStorage.getItem('user'));
    // Enter to room.
    this.singIn();
    this.chatService.getMessages().subscribe(data => {
      this.messages.push({ Author: data.Author, Text: data.Text });
    });
  }

  // Send a message to chat between two players.
  send() {
    this.chatService.sendInfo({
      idRoom: this.idRoom,
      Author: this.author,
      Text: this.newMessage
    });
    this.newMessage = '';
  }

  // Join to char room.
  singIn() {
    this.chatService.joinSession({ idRoom: this.idRoom });
  }
}
