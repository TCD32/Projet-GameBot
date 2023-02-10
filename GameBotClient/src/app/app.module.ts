import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamePageJustePrixComponent } from './components/game-pages/game-page-juste-prix/game-page-juste-prix.component';
import { HeaderGamePickerComponent } from './components/header-game-picker/header-game-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameCardComponent } from './components/game-carousel-page/game-card/game-card.component';
import { GameCardCarouselComponent } from './components/game-carousel-page/game-card-carousel/game-card-carousel.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameCarouselPageComponent } from './components/game-carousel-page/game-carousel-page.component';
import { GamePagePuissanceQuatreComponent } from './components/game-pages/game-page-puissance-quatre/game-page-puissance-quatre.component';
import { GamePagesComponent } from './components/game-pages/game-pages.component';


@NgModule({
  declarations: [
    AppComponent,
    GamePageJustePrixComponent,
    HeaderGamePickerComponent,
    GameCardComponent,
    GameCardCarouselComponent,
    LoginPageComponent,
    GameCarouselPageComponent,
    GamePagePuissanceQuatreComponent,
    GamePagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      maxOpened: 3,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
