import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamePageJustePrixComponent } from './components/game-pages/game-page-juste-prix/game-page-juste-prix.component';
import { HeaderGamePickerComponent } from './components/header-game-picker/header-game-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameCardComponent } from './components/game-carousel-page/game-card/game-card.component';
import { GameCardCarouselComponent } from './components/game-carousel-page/game-card-carousel/game-card-carousel.component';
import { GameListPageComponent } from './components/game-list-page/game-list-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameCarouselPageComponent } from './components/game-carousel-page/game-carousel-page.component';


@NgModule({
  declarations: [
    AppComponent,
    GamePageJustePrixComponent,
    HeaderGamePickerComponent,
    GameCardComponent,
    GameCardCarouselComponent,
    GameListPageComponent,
    LoginPageComponent,
    GameCarouselPageComponent
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
