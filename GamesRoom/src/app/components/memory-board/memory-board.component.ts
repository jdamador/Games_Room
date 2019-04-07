import { Component, OnInit } from '@angular/core';
import { MemoryService } from 'src/app/shared/services/memory/memory.service';

@Component({
  selector: 'app-memory-board',
  templateUrl: './memory-board.component.html',
  styleUrls: ['./memory-board.component.css']
})
export class MemoryBoardComponent implements OnInit {
  // Cards will be show in the game board.
  cards: [];
  session: any;

  // Default image, it is shows when the card is not flipped.
  images_inact = '/assets/Memory/poker.png';

  ngOnInit() {
    // When the board component is called, it get a new board from the API.
    this.memoryService.getAllBoard().subscribe(response => {
      this.cards = response['grid'];
      this.session = response;
    });
  }

  constructor(private memoryService: MemoryService) {}

  // When a card is clicked an event is throw.
  card_selected(i) {}
}
