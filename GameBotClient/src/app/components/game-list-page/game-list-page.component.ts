import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

declare const IGS: any;
declare const iopTypes: any;

@Component({
  selector: 'app-game-list-page',
  templateUrl: './game-list-page.component.html',
  styleUrls: ['./game-list-page.component.css']
})
export class GameListPageComponent implements OnInit {

  gameList: Game[];

  constructor(private gameService: GameService) {
    this.gameList = this.gameService.getGamesList();
  }

  ngOnInit(): void {
  }

}
