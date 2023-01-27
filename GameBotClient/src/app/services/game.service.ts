import { Injectable } from '@angular/core';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  _gamesList: Game[];
  _currentGame: Game | null;

  constructor() {
    this._gamesList = [];
    this._currentGame = null;
  }

  public get currentGame() {
    return this._currentGame;
  }

  public set currentGame(game: Game | null) {
    this._currentGame = game;
  }
  
  public get gamesList() {
    return this._gamesList;
  }

  public set gamesList(games: Game[]) {
    this._gamesList = games;
  }

  public addGameToList(game: Game) {
    this._gamesList.push(game);
  }

  public removeGameFromList(game: Game) {
    const index = this._gamesList.indexOf(game);
    if (index > -1) {
      this._gamesList.splice(index, 1);
    }
  }

}
