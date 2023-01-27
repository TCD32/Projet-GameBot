import { Component } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

declare const IGS:any;

@Component({
  selector: 'app-game-card-carousel',
  templateUrl: './game-card-carousel.component.html',
  styleUrls: ['./game-card-carousel.component.css']
})
export class GameCardCarouselComponent {

  games: Game[];
  current: number;

  constructor(private gameService: GameService) {
    this.current = 0;
    this.games = this.gameService.gamesList;
  }

  onPrevious() {
    let prevIndex = this.current - 1;
    this.current =  prevIndex < 0 ? (this.games.length - 1) : prevIndex;
  }

  onNext() {
    this.current = (this.current + 1) % this.games.length;
  }

  onTest() {
    let serviceArgs: any[] = [];
    IGS.serviceCall("Whiteboard", "clear", serviceArgs, "");

    serviceArgs = [];
    IGS.serviceArgsAddString(serviceArgs, "rectangle");
    IGS.serviceArgsAddDouble(serviceArgs, 200);
    IGS.serviceArgsAddDouble(serviceArgs, 200);
    IGS.serviceArgsAddDouble(serviceArgs, 400);
    IGS.serviceArgsAddDouble(serviceArgs, 5);
    IGS.serviceArgsAddString(serviceArgs, "black");
    IGS.serviceArgsAddString(serviceArgs, "black");
    IGS.serviceArgsAddDouble(serviceArgs, 0);
    IGS.serviceCall("Whiteboard", "addShape", serviceArgs, "");

    serviceArgs = [];
    IGS.serviceArgsAddString(serviceArgs, "rectangle");
    IGS.serviceArgsAddDouble(serviceArgs, 200);
    IGS.serviceArgsAddDouble(serviceArgs, 320);
    IGS.serviceArgsAddDouble(serviceArgs, 400);
    IGS.serviceArgsAddDouble(serviceArgs, 5);
    IGS.serviceArgsAddString(serviceArgs, "black");
    IGS.serviceArgsAddString(serviceArgs, "black");
    IGS.serviceArgsAddDouble(serviceArgs, 0);
    IGS.serviceCall("Whiteboard", "addShape", serviceArgs, "");

    serviceArgs = [];
    IGS.serviceArgsAddString(serviceArgs, "rectangle");
    IGS.serviceArgsAddDouble(serviceArgs, 320);
    IGS.serviceArgsAddDouble(serviceArgs, 100);
    IGS.serviceArgsAddDouble(serviceArgs, 5);
    IGS.serviceArgsAddDouble(serviceArgs, 350);
    IGS.serviceArgsAddString(serviceArgs, "black");
    IGS.serviceArgsAddString(serviceArgs, "black");
    IGS.serviceArgsAddDouble(serviceArgs, 0);
    IGS.serviceCall("Whiteboard", "addShape", serviceArgs, "");

    serviceArgs = [];
    IGS.serviceArgsAddString(serviceArgs, "rectangle");
    IGS.serviceArgsAddDouble(serviceArgs, 480);
    IGS.serviceArgsAddDouble(serviceArgs, 100);
    IGS.serviceArgsAddDouble(serviceArgs, 5);
    IGS.serviceArgsAddDouble(serviceArgs, 350);
    IGS.serviceArgsAddString(serviceArgs, "black");
    IGS.serviceArgsAddString(serviceArgs, "black");
    IGS.serviceArgsAddDouble(serviceArgs, 0);
    IGS.serviceCall("Whiteboard", "addShape", serviceArgs, "");
  }

}
