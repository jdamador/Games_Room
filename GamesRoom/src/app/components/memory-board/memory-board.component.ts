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
  }

  constructor(private memoryService: MemoryService) {}

  // When a card is clicked an event is throw.
  card_selected(i) {}
}
