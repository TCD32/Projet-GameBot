import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Player } from 'src/app/models/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  loginForm: FormGroup;
  submitted: boolean;

  color: string;

  constructor(
    private playerService: PlayerService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.color = PlayerService.generateColor();
    this.submitted = false;
    this.loginForm = this.formBuilder.group({
      nickname: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
      ],
    });
  }
  
  get fl() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const nickname = this.fl['nickname'].value;
    const id = PlayerService.generateUID();
    const color = PlayerService.generateColor();
    const player: Player = {
      id: id,
      nickname: nickname,
      color: color,
    }

    this.playerService.player = player;
    this.router.navigateByUrl("games");
    this.toastrService.success(`Connecté en tant que ${nickname} !`);
  }

}