import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../../models/player.model';
@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  _baseUrl = 'https://danibttecastrom-001-site1.dtempurl.com/api/Players/';
  private http = inject(HttpClient)
  constructor() { }

  createPlayer(newPlayer: Player): Observable<Player> {
    return this.http.post<Player>(
      `${this._baseUrl}`,
      newPlayer
    );
  }

  listPlayer(): Observable<Player> {
    return this.http.get<Player>(
      `${this._baseUrl}`
    );
  }

}
