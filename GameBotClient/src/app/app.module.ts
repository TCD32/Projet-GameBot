import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamePageJustePrixComponent } from './components/game-pages/game-page-juste-prix/game-page-juste-prix.component';
import { HeaderGamePickerComponent } from './components/header-game-picker/header-game-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameCardCarouselComponent } from './components/game-card-carousel/game-card-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    GamePageJustePrixComponent,
    HeaderGamePickerComponent,
    GameCardComponent,
    GameCardCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
