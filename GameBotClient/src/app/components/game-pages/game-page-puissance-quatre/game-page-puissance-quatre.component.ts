import { Component, Input } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameCommand } from 'src/app/models/game_command';
import { Player } from 'src/app/models/player';
import { GameService } from 'src/app/services/game.service';
import { GameBotService } from 'src/app/services/gamebot.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-game-page-puissance-quatre',
  templateUrl: './game-page-puissance-quatre.component.html',
  styleUrls: ['./game-page-puissance-quatre.component.css']
})
export class GamePagePuissanceQuatreComponent {

  game: Game | null;
  player: Player | null;

  columns: number[];
  selectedColumn: number | null;

  columnStyle: {[klass: string]: any};
  columnHoverStyle: {[klass: string]: any};


  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private gameBotService: GameBotService
  ) {
    this.columns = [0,1,2,3,4,5,6];
    this.selectedColumn = null;
    this.game = this.gameService.currentGame;
    this.player = this.playerService.player;

    this.columnStyle = {
      "border-left": "lightgray solid 2px",
      "border-right": "lightgray solid 2px",
      "text-decoration": "none",
      "color": "black",
    };
    
    this.columnHoverStyle = {
      "border-left": "lightgray solid 2px",
      "border-right": "lightgray solid 2px",
      "background-color": this.player?.color ?? "lightblue",
      "cursor": "pointer",
      "text-decoration": "none",
      "color": "black",
    }
  }

  onColumnClick(col: number) {
    this.selectedColumn = col;
    let command: GameCommand = {
      gameId: this.game!.id,
      playerId: this.player!.id,
      command: {
        "colonne": col,
      },
    }

    this.gameBotService.sendCommand(command);
  }

  highlightColumn(index: number) {
    this.selectedColumn = index;
  }

  resetHighlight() {
    this.selectedColumn = null;
  }
}
