import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat-service/chat.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.css']
})
export class ChatBoardComponent implements OnInit {
  currentRoom= "sala";
  message: string;
  messages= [];
  newMessage: string;
  author="roy"
  idSala= "sala2"

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getMessages()
      .subscribe((data) => {
        this.messages.push({"Author": data.author, "Text": data.text});
      });
  }

  envio(){
    this.chatService.envioInfo({"idSala":this.idSala, "author":this.author, "text":this.newMessage})
    this.newMessage= ""
  }

  

}
