import { Injectable } from '@angular/core';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  _player: Player | null;

  constructor() {
    this._player = null;
  }

  public get player() {
    // let current = localStorage.getItem('player');

    // if(current != null) {
    //   let player: Player = JSON.parse(current) as Player;
    //   return player;
    // } else {
    //   return null;
    // }
    return this._player;
  }

  public set player(value: Player | null) {
    this._player = value;

    if(value !== null) {
      localStorage.setItem('player', JSON.stringify(value));
    } else {
      localStorage.removeItem('player');
    }
  }

  static generateUID() {
    let firstPartRand = (Math.random() * 46656) | 0;
    let secondPartRand = (Math.random() * 46656) | 0;
    let firstPart = ("000" + firstPartRand.toString(36)).slice(-3);
    let secondPart = ("000" + secondPartRand.toString(36)).slice(-3);

    return firstPart + secondPart;
  }

  static generateColor() {
    // let randomColor = Math.floor(Math.random()*16777215).toString(16);

    // return "#" + randomColor;

    const rangeSize = 225; // adapt as needed
    const parts = [
        Math.floor(Math.random()*256),
        Math.floor(Math.random()*rangeSize),
        Math.floor(Math.random()*rangeSize) + 256-rangeSize]; 
    // ].sort( (a, b) => Math.random() < 0.5 );

    console.log(parts.map( p => ('0' + p.toString(16)).substr(-2) ).join(''));
    return "#" + parts.map( p => ('0' + p.toString(16)).substr(-2) ).join('');
  }
}
