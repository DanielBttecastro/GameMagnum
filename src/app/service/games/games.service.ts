import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  _baseUrl = 'https://danibttecastrom-001-site1.dtempurl.com/api/Games/';
  private http = inject(HttpClient)
  constructor() { }

  createGame(newGame: Game): Observable<Game> {
    return this.http.post<Game>(
      `${this._baseUrl}`,
      newGame
    );
  }

  listGame( ): Observable<Game> {
    return this.http.get<Game>(
      `${this._baseUrl}`
    );
  }

  listInfo( ): Observable<Object> {
    return this.http.get<Game>(
      `${this._baseUrl}info`
    );
  }

}
