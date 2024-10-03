import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { RoundGame } from 'src/app/models/round-game.model';

@Injectable({
  providedIn: 'root'
})
export class RoundGameService {
  _baseUrl = 'https://danibttecastrom-001-site1.dtempurl.com/api/RoundsGames/';
  private http = inject(HttpClient)
  constructor() { }

  createRoundGame(newRoundGame: RoundGame): Observable<RoundGame> {
    return this.http.post<RoundGame>(
      `${this._baseUrl}`,
      newRoundGame
    );
  }
}
