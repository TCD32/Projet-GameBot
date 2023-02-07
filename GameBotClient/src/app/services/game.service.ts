import { Injectable } from '@angular/core';
import { agentGameBot, agentGameBotClient } from 'src/environments/environment';
import { Game } from '../models/game';
import { GameCommand } from '../models/game_command';
import { Player } from '../models/player';

declare const IGS: any;

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _gamesList: {[id: string]: Game};
  private _currentGame: Game | null;

  constructor() {
    this._gamesList = {};
    this._currentGame = null;
  }

  public get currentGame() {
    return this._currentGame;
  }

  public set currentGame(game: Game | null) {
    this._currentGame = game;
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

  public sendCommand(command: GameCommand) {
    IGS.outputSetString(agentGameBotClient.outputs.command, JSON.stringify(command));
  }

  public getGame(gameId: string) {
    return this._gamesList[gameId];
  }

  public getGames() {
    let serviceArgs: any[] = [];

    let games: Game[];
    games = IGS.serviceCall(agentGameBot.id, agentGameBot.services.getGames, serviceArgs, "");
    console.log(`Called service ${agentGameBot.services.getGames} with arg ${serviceArgs}`);

    return games;
  }

  public ready(player: Player, game: Game) {
    if(this._currentGame == null || this._currentGame.id === game.id) {
      this._currentGame = game;
      let serviceArgs: any[] = [];
  
      IGS.serviceArgsAddString(serviceArgs, JSON.stringify(player));
      IGS.serviceArgsAddString(serviceArgs, this._currentGame.id);
      IGS.serviceCall(agentGameBot.id, agentGameBot.services.ready, serviceArgs, "");
      console.log(`Called service ${agentGameBot.services.ready} with arg ${serviceArgs}`);
      return true;
    } else {
      console.log(`Cannot call service ${agentGameBot.services.ready} because player is already ready`);
      return false;
    }
  }

}
