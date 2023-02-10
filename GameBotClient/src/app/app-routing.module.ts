import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameCarouselPageComponent } from './components/game-carousel-page/game-carousel-page.component';
import { GameListPageComponent } from './components/game-list-page/game-list-page.component';
import { GamePagesComponent } from './components/game-pages/game-pages.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: "login", component: LoginPageComponent},
  {path: "list", component: GameListPageComponent},
  {path: "games", component: GameCarouselPageComponent},
  {path: "games/:gameId", component: GamePagesComponent},
  {path: '**', redirectTo: '/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
