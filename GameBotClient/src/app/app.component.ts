import { Component } from '@angular/core';
import { Color } from './models/color';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "GameBot";

  constructor(private gameService: GameService) {
    this.gameService.gamesList = [
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
    ];
  }

}
