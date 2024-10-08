import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../models/player.model';
import { GamesService } from './games/games.service';
import { RoundService } from './round/round.service';
import { Game } from '../models/game.model';
import { Rounds } from '../models/rounds.model';
import { Observable, Subject } from 'rxjs';
import { PlayersService } from './players/players.service';
import { RoundGame } from '../models/round-game.model';
import { RoundGameService } from './roundGame/round-game.service';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  contPlayer: number = 0;
  gamesList!:Game;
  roundList!:Rounds;
  playerList!:Player;
  private playersUpdated = new Subject<Player>();


  constructor(
    private readonly playerService: PlayersService,
    private readonly gamesService: GamesService,
    private readonly roundGameService: RoundGameService,
    private readonly roundService: RoundService,
    private router: Router) { }

  ngOnInit(): void {
  }


  incrementPlayer() {
    this.contPlayer++;
    if (this.contPlayer == 2) {
      this.router.navigate(['/Round']);
    }
  }

  getLocalStorage(key: string): Player | null {
    const playerData = sessionStorage.getItem(key);
    return playerData ? JSON.parse(playerData) : null;
  }

  getLocalStorageRound(key: string): Rounds | null {
    const playerData = sessionStorage.getItem(key);
    return playerData ? JSON.parse(playerData) : null;
  }

  createGame(name: string) {
    const newGame: Game = {
      nombre: name//Dato auxiliar para Crear un nuevo Juego
    };
    //Crear un nuevo juego
    this.gamesService.createGame(newGame).subscribe(
      (response) => {
        sessionStorage.setItem('Game', JSON.stringify(response));
        this.createRound(response)
      },
      (error) => {
        console.error('Error al crear el juego:', error);
      }
    );
  }

  createRound(response: Game) {
    //Creacion de una nueva ronda corespondiente al nuevo juego
    const newRound: Rounds = {
      aux: "auxiliar",//Dato auxiliar para crear una nueva ronda
      Id_Game: response.id ?? "2"
    };
    //Crear una nueva ronda
    this.roundService.createRound(newRound).subscribe(
      (response) => {
        sessionStorage.setItem('Round', JSON.stringify(response));
        this.router.navigate(['/Game']);//Redireccion al Juego
      },
      (error) => {
        console.error('Error al crear la ronda:', error);
      }
    );

  }
  createGameRound(optionPlayer:string,player:Player,roundActual: Rounds,victory:boolean){
    const roundGame: RoundGame = {
      Id_Options: optionPlayer,
      Id_Players: player.id ?? "1",
      Id_Rounds: roundActual.id ?? "1",
      victory: victory
    };
    this.roundGameService.createRoundGame(roundGame).subscribe(
      (response) => {
        console.log("ActionPlayer1 " + response)
      },
      (error) => {
        console.error('Error al crear el juego:', error);
      }
    );
  }


}
