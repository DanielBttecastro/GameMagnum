import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rounds } from 'src/app/models/rounds.model';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  _baseUrl = 'http://piedrapapeltijeras.somee.com/api/Rounds/';
  private http = inject(HttpClient)
  constructor() { }
  createRound(newRound: Rounds): Observable<Rounds> {
    return this.http.post<Rounds>(
      `${this._baseUrl}`,
      newRound
    );
  }

  listRound(): Observable<Rounds> {
    return this.http.get<Rounds>(
      `${this._baseUrl}`
    );
  }
}
