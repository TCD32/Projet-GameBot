import { Component, OnInit } from '@angular/core';

declare const IGS: any;

@Component({
  selector: 'app-header-game-picker',
  templateUrl: './header-game-picker.component.html',
  styleUrls: ['./header-game-picker.component.css']
})
export class HeaderGamePickerComponent implements OnInit {

  public state: String = "Déco";

  constructor() { }

  ngOnInit(): void {
    IGS.observeWebSocketState(this.isConnectedToServerChanged);
  }

  isConnectedToServerChanged(isConnected: boolean) {
    console.log(isConnected.toString());
    this.state = isConnected ? "Connected" : "Disconnected";
  }

}
