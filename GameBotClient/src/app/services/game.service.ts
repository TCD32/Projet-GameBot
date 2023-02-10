import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { GameBotService } from './gamebot.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _gamesList: {[id: string]: Game};
  private _currentGame: Game | null;

  private _playerReady: boolean;

  constructor(private gameBotService: GameBotService) {
    this._gamesList = {};
    this._currentGame = null;
    this._playerReady = false;
  }

  public get currentGame() {
    return this._currentGame;
  }

  public set currentGame(game: Game | null) {
    this._currentGame = game;
  }
  
  public get playerReady() {
    return this._playerReady;
  }

  public set playerReady(value: boolean) {
    this._playerReady = value;
  }

  public getGamesList() {
    return Object.values(this._gamesList);
  }

  public setGamesList(games: Game[]) {
    this._gamesList = {};
    for(let game of games) {
      this._gamesList[game.id] = game;
    }
  }

  public getGame(gameId: string) {
    return this._gamesList[gameId];
  }

  public ready(player: Player, game: Game) {
    if(this.currentGame === null) { // Never set ready before
      this.currentGame = game;
      this.gameBotService.ready(player, this.currentGame.id);
      this.playerReady = true;
    } else if(game.id === this.currentGame.id) { // Ready on current selected game
      if(this.playerReady) { // Un-ready
        this.gameBotService.ready(player, this.currentGame.id);
        this.playerReady = false;
      } else { // Ready
        this.gameBotService.ready(player, this.currentGame.id);
        this.playerReady = true;
      }
    } else { // Ready on another game
      if(this.playerReady) {
        throw new Error("User tried to ready on a game but it is already waiting for another");
      } else {
        this.currentGame = game;
        this.gameBotService.ready(player, this.currentGame.id);
        this.playerReady = true;
      }
    }

    return this.playerReady;
  }

}
