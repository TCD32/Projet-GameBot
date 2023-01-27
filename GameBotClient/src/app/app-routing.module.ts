import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameCardCarouselComponent } from './components/game-card-carousel/game-card-carousel.component';
import { GamePageJustePrixComponent } from './components/game-pages/game-page-juste-prix/game-page-juste-prix.component';

const routes: Routes = [
  {"path": "", component: GameCardCarouselComponent},
  {"path": "list", component: GamePageJustePrixComponent},
  {"path": "games/0", component: GamePageJustePrixComponent}, // TODO: change
  {"path": "games/1", component: GamePageJustePrixComponent} // TODO: change
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
