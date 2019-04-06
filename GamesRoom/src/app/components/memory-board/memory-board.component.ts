import { Component, OnInit } from '@angular/core';
import { MemoryService } from 'src/app/shared/services/memory/memory.service';

@Component({
  selector: 'app-memory-board',
  templateUrl: './memory-board.component.html',
  styleUrls: ['./memory-board.component.css']
})
export class MemoryBoardComponent implements OnInit {
  cards = [];
  constructor(private memory: MemoryService) {}
  ngOnInit() {
    
  }
}
