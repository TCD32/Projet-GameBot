import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from 'src/app/models/game';
import { GamePage } from 'src/app/models/game_page';
import { GameService } from 'src/app/services/game.service';
import { agentWhiteboard } from 'src/environments/environment';
import { JustePrix } from 'src/scripts/games/juste_prix';

declare const IGS: any;

@Component({
  selector: 'app-game-page-juste-prix',
  templateUrl: './game-page-juste-prix.component.html',
  styleUrls: ['./game-page-juste-prix.component.css']
})
export class GamePageJustePrixComponent implements GamePage {
  game: Game | null;

  propositionForm: FormGroup;
  gameLogic: JustePrix;

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GameService,
  ) {
    this.propositionForm = this.formBuilder.group({
      proposition: [
        '',
        [Validators.required, Validators.maxLength(64)],
      ],
    });
    this.gameLogic = new JustePrix();
    this.game = this.gameService.currentGame;
  }

  get pf() {
    return this.propositionForm.controls;
  }

  onSubmitProposition() {
    let value: number = +this.pf["proposition"].value;
    let result: String = this.gameLogic.try(value);

    this.onGameResult(result);
  }

  onGameStart() {
    // TODO
  }

  onGameResult(result: String) {
    let message: String = `[${this.game!.title}] ${result}`;
    let serviceArgs: any = [];

    // Clear whiteboard
    IGS.serviceCall(agentWhiteboard.id, agentWhiteboard.services.clear, serviceArgs, "");

    // Sending message in chat
    serviceArgs = [];
    IGS.serviceArgsAddString(serviceArgs, message);
    IGS.serviceCall(agentWhiteboard.id, agentWhiteboard.services.chat, serviceArgs, "");

    // Adding text to whiteboard
    serviceArgs = [];
    IGS.serviceArgsAddString(serviceArgs, result);
    IGS.serviceArgsAddDouble(serviceArgs, 0);
    IGS.serviceArgsAddDouble(serviceArgs, 0);
    IGS.serviceArgsAddString(serviceArgs, "green");
    IGS.serviceCall(agentWhiteboard.id, agentWhiteboard.services.addText, serviceArgs, "");
  }
}
