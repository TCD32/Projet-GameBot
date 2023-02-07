import { Component, Input } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

declare const IGS: any;

@Component({
  selector: 'app-header-game-picker',
  templateUrl: './header-game-picker.component.html',
  styleUrls: ['./header-game-picker.component.css']
})
export class HeaderGamePickerComponent {

  hideOnRoutes: string[] = [
    "/login"
  ]

  @Input()
  connected!: boolean;
  hide: boolean;

  constructor(
    public playerService: PlayerService,
    public router: Router,
  ) {
    this.hide = false;
    this.router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        this.hide = this.hideOnRoutes.includes(event.url);

        console.log(`${this.hideOnRoutes} contains ${event.url} ? ${this.hide}`);
      }
    });
  }

}
