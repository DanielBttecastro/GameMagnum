import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from 'src/app/models/options.model';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  _baseUrl = 'http://piedrapapeltijeras.somee.com/api/Options/';
  private http = inject(HttpClient)
  constructor() { }

  getOptions(): Observable<Options> {
    return this.http.get<Options>(
      `${this._baseUrl}`
    );
  }
}
