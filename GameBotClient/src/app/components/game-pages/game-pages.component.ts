import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-pages',
  templateUrl: './game-pages.component.html',
  styleUrls: ['./game-pages.component.css']
})
export class GamePagesComponent implements OnInit {

  gameId: string | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params['gameId'];
    });
  }

}
