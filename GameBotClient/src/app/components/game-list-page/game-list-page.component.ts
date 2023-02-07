import { Component, OnInit } from '@angular/core';
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
    this.gameList = [];

    IGS.serviceInit("getGamesResult", this.onGetGames, this.gameList);
    IGS.servicesArgsAdd("getGamesResults", "gamesJsonArray", iopTypes.IGS_STRING_T);
    this.gameService.getGames();
  }

  onGetGames(games: Game[]) {
    console.log(games);
    this.gameList = games;
  }

  ngOnInit(): void {
  }

}
