import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memory-board',
  templateUrl: './memory-board.component.html',
  styleUrls: ['./memory-board.component.css']
})
export class MemoryBoardComponent implements OnInit {
  // Game's imagenes.
  private images = [
    { id: 1, url: '/assets/images/10.png' },
    { id: 2, url: '/assets/images/J.png' },
    { id: 3, url: '/assets/images/K.png' },
    { id: 4, url: '/assets/images/Q.png' }
  ];
  // Image that is show when the cards aren't flipped.
  public images_inact = '/assets/images/poker.png';
  public cards = [];
  //
  private last_select_id = null;
  // Quantity of possible matches.
  // TODO: Add more elements.
  private hits = 4;
  // Quantity of matches found.
  private count_aciertos = 0;

  constructor() {}

  // When the component is init create a logic board.
  ngOnInit() {
    let count_index = 0;
    // Exec until i is bigger than quantity of card pair.
    for (let i = 0; i < this.hits * 2; i++) {
      if (count_index === this.hits) {
        count_index = 0;
      }
      const img = this.images[count_index];
      this.cards.push({
        id: img.id,
        url: img.url,
        visible: false, // It's visible.
        active: true    // It's possible select it.
      });

      count_index++;
    }
    // Call a method that shuffle.
    this.RandomArray(this.cards);
  }
  // Method that is called when a card is selected.
  card_selected(idx: number) {
    // If the card is inactive skip the validation.
    if (!this.cards[idx].active) {
      return;
    }
    // Show the card's value.
    this.cards[idx].visible = true;
    // If is the first card selected.
    if (this.last_select_id == null) {
      // Set the id as first pick.
      this.last_select_id = idx;
      // Show and block it avoid the double selection.
      this.cards[idx].visible = true;
      this.cards[idx].active = false;
    } else {
      // If is the second pick, check if both are equal.
      if (this.cards[this.last_select_id].id === this.cards[idx].id) {
        // Increase the hits for the active player.
        this.count_aciertos++;
        // Reset the state for game variables.
        this.cards[idx].visible = true;
        this.cards[idx].active = false;
        this.last_select_id = null;
      } else {
        // If don't do match.
        const _this = this;
        // Show the animation that appears when a card is flipped.
        setTimeout(function() {
          _this.cards[_this.last_select_id].visible = false; // Hide.
          _this.cards[_this.last_select_id].active = true;   // Active.
          _this.cards[idx].visible = false;
          _this.last_select_id = null;
        }, 0.2 * 1000);
      }
    }
    // Check if the game is finished.
    if (this.hits === this.count_aciertos) {
      alert('Juego Terminado');
      // Refresh the page.
    }
  }
  // Shuffle the array to set all images.
  RandomArray(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
