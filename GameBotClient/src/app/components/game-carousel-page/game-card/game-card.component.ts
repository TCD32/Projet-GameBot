import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';


@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {

  @Input()
  game!: Game;
  isReady: boolean;

  gradient: String;
  buttonStyle: {[klass: string]: any};
  buttonHoverStyle: {[klass: string]: any};
  buttonReadyStyle: {[klass: string]: any};

  public hover: boolean;

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.isReady = false;
    this.gradient = "";
    this.buttonStyle = {};
    this.buttonHoverStyle = {};
    this.buttonReadyStyle = {};
    this.hover = false;
  }

  ngOnInit(): void {
    let gameColor: Color = this.game.color;
    let secondColor: Color = new Color(
      Math.min(gameColor.r + 10, 255),
      Math.min(gameColor.g + 80, 255),
      Math.min(gameColor.b + 80, 255),
      gameColor.a
    );
    let gameColorLight: Color = new Color(
      gameColor.r,
      gameColor.g,
      gameColor.b,
      0.3
    );

    this.gradient = `linear-gradient(20deg, ${gameColor.toRGBA()}, ${secondColor.toRGBA()})`;

    this.buttonStyle = {
      "background": this.gradient,
      "color": "white",
    };
    this.buttonHoverStyle = {
      "background": this.gradient,
      "box-shadow": `0 3px 12px 0px ${gameColorLight.toRGBA()}`,
    }
    this.buttonReadyStyle = {
      "background-color": "green",
    }
  }

  onPlayGame() {
    if(this.playerService.player) {
      try {
        this.isReady = this.gameService.ready(this.playerService.player, this.game);
      } catch (error) {
        this.toastrService.error(`Vous êtes déjà en attente pour ${this.gameService.currentGame?.title}`);
      }
    } else {
      this.toastrService.error("Il faut avoir un pseudo pour pouvoir jouer !");
      this.router.navigateByUrl("login");
    }
  }

}
