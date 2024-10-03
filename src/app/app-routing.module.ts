import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { GamesRoundsComponent } from './pages/games-rounds/games-rounds.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Game', component: GameComponent },
  { path: 'Round', component: GamesRoundsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
