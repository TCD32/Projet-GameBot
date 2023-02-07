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
        "title": "Tic Tac Toe",
        "players": 2,
        "description": "Le jeu du Tic Tac Toe !",
        "image": "https://wallpapercrafter.com/sizes/1920x1080/1146-gradient-color-faded-blue-4k.jpg",
        "color": new Color(240, 152, 25, 1),
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
    
    console.log(this.playerService);
    if(this.playerService.player != null && playerIdValue == this.playerService.player.id) {
      var log = senderAgentName + " called service " + serviceName;
      console.log(log);

      this.gameService.currentGame = this.gameService.getGame(gameIdValue);
      this.toastrService.success(`La partie de ${this.gameService.currentGame.title} commence !`);
      this.router.navigateByUrl(`games/${gameIdValue}`);
    }
  }

  isConnectedToServerChanged(isConnected: boolean)
  {
    this.connected = isConnected;
  }
  
}
