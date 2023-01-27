import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-card-carousel',
  templateUrl: './game-card-carousel.component.html',
  styleUrls: ['./game-card-carousel.component.css']
})
export class GameCardCarouselComponent {

  games: Game[];
  current: number;

  constructor(private gameService: GameService) {
    this.current = 0;
    this.games = this.gameService.gamesList;
  }

  onPrevious() {
    let prevIndex = this.current - 1;
    this.current =  prevIndex < 0 ? (this.games.length - 1) : prevIndex;
  }

  onNext() {
    this.current = (this.current + 1) % this.games.length;
  }
}
