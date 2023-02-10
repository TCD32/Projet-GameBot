import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from 'src/app/models/game';
import { GameCommand } from 'src/app/models/game_command';
import { Player } from 'src/app/models/player';
import { GameService } from 'src/app/services/game.service';
import { GameBotService } from 'src/app/services/gamebot.service';
import { PlayerService } from 'src/app/services/player.service';


@Component({
  selector: 'app-game-page-juste-prix',
  templateUrl: './game-page-juste-prix.component.html',
  styleUrls: ['./game-page-juste-prix.component.css']
})
export class GamePageJustePrixComponent {
  game: Game | null;
  player: Player| null;

  buttonDisabled: boolean;
  propositionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GameService,
    private playerService: PlayerService,
    private gameBotService: GameBotService
  ) {
    this.propositionForm = this.formBuilder.group({
      proposition: [
        '',
        [Validators.maxLength(4), Validators.pattern("[0-9]+")],
      ],
    });
    this.buttonDisabled = false;
    this.game = this.gameService.currentGame;
    this.player = this.playerService.player;
  }

  get pf() {
    return this.propositionForm.controls;
  }

  onSubmitProposition() {
    const proposition = +this.pf['proposition'].value;
    
    let command: GameCommand = {
      gameId: this.game!.id,
      playerId: this.player!.id,
      command: {
        "value": proposition,
      },
    }

    this.gameBotService.sendCommand(command);
    this.propositionForm.reset();
    this.buttonDisabled = true;
    setTimeout(() => {this.buttonDisabled = false;}, 2000);
  }
}
