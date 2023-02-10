import { Injectable } from '@angular/core';
import { GameCommand } from '../models/game_command';
import { Player } from '../models/player';

declare const IGS: any

@Injectable({
  providedIn: 'root'
})
export class GameBotService {

  constructor() {}

  public ready(player: Player, gameId: string) {
    let serviceArgs: any[] = [];

    IGS.serviceArgsAddString(serviceArgs, JSON.stringify(player));
    IGS.serviceArgsAddString(serviceArgs, gameId);
    IGS.serviceCall("GameBot", "ready", serviceArgs, "");
    console.log(`Called service ready with args ${serviceArgs}`);
  }
  
  public sendCommand(command: GameCommand) {
    let commandString = JSON.stringify(command);
    IGS.outputSetString("command", commandString);
    console.log(`Sent ${commandString} as command output`);
  }
}
