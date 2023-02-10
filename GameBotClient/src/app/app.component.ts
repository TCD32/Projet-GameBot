import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from './models/color';
import { GameService } from './services/game.service';
import { PlayerService } from './services/player.service';

declare const IGS: any;
declare const iopTypes: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "GameBot";
  connected;

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private toastrService: ToastrService,
    private router: Router, 
  ) {
    this.connected = true;
    this.gameService.setGamesList([
      {
        "id": "0",
        "title": "Juste Prix",
        "players": 2,
        "description": "Le jeu du Juste Prix !",
        "image": "https://magicdice.tv/wp-content/uploads/LJP_Logo-1280x720.jpg",
        "color": new Color(170, 7, 107, 1),
      },
      {
        "id": "1",
        "title": "Puissance 4",
        "players": 2,
        "description": "Le jeu du Puissance 4 !",
        "image": "https://susancall.com/wp-content/uploads/2014/04/games-1043006_1920-1080x675.jpg",
        "color": new Color(37, 130, 230, 1),
      }
    ]);

    IGS.netSetServerURL("ws://172.26.16.1:5000");
    IGS.agentSetName("GameBotClient");
    IGS.observeWebSocketState(this.isConnectedToServerChanged.bind(this));

    IGS.definitionSetDescription("GameBot client providing UI to play its games and synchronocity management");
    IGS.definitionSetVersion("1.0");

    // services
    IGS.serviceInit("displayGame", this.displayGameServiceCallback.bind(this));
    IGS.serviceArgAdd("displayGame", "playerId", iopTypes.IGS_STRING_T);
    IGS.serviceArgAdd("displayGame", "gameId", iopTypes.IGS_STRING_T);

    IGS.serviceInit("displayHome", this.displayHomeServiceCallback.bind(this));
    IGS.serviceArgAdd("displayHome", "playerId", iopTypes.IGS_STRING_T);
    IGS.serviceArgAdd("displayHome", "message", iopTypes.IGS_STRING_T);

    // outputs
    IGS.outputCreate("command", iopTypes.IGS_STRING_T, "");

    //actually start ingescape
    IGS.start();
  }

  displayGameServiceCallback(
    senderAgentName: string,
    senderAgentUUID: string,
    serviceName: string,
    serviceArguments: any[],
    token: string,
    myData: any
  ) {
    var playerIdValue = serviceArguments[0].value;
    var gameIdValue = serviceArguments[1].value;
    
    if(this.playerService.player != null && playerIdValue == this.playerService.player.id) {
      var log = senderAgentName + " called service " + serviceName;
      console.log(log);

      this.gameService.currentGame = this.gameService.getGame(gameIdValue);
      this.toastrService.success(`La partie de ${this.gameService.currentGame.title} commence !`);
      this.router.navigateByUrl(`games/${gameIdValue}`);
    }
  }

  displayHomeServiceCallback(
    senderAgentName: string,
    senderAgentUUID: string,
    serviceName: string,
    serviceArguments: any[],
    token: string,
    myData: any
  ) {
    var playerIdValue = serviceArguments[0].value;
    var messageValue = serviceArguments[1].value;
    
    if(this.playerService.player != null && playerIdValue == this.playerService.player.id) {
      var log = senderAgentName + " called service " + serviceName;
      console.log(log);

      this.toastrService.info(messageValue);
      this.router.navigateByUrl(`games`);
    }
  }

  isConnectedToServerChanged(isConnected: boolean)
  {
    this.connected = isConnected;
  }
  
}
