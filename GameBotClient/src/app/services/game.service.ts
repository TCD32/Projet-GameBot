import { Injectable } from '@angular/core';
import { agentGameBot, agentGameBotClient } from 'src/environments/environment';
import { Game } from '../models/game';
import { GameCommand } from '../models/game_command';

declare const IGS: any;

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

  public sendCommand(command: GameCommand) {
    IGS.outputSetString(agentGameBotClient.outputs.command, JSON.stringify(command));
  }

  public ready(playerId: string) {
    if(this._currentGame != null) {
      let serviceArgs: any[] = [];
  
      IGS.serviceArgsAddString(serviceArgs, playerId);
      IGS.serviceArgsAddString(serviceArgs, this._currentGame.id);
      IGS.serviceCall(agentGameBot.id, agentGameBot.services.ready, serviceArgs, "");
      console.log(`Called service ${agentGameBot.services.ready} with arg ${serviceArgs}`);

    } else {
      console.log("Cannot ready, no game running");
    }
  }

}
