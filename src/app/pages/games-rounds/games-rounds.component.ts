import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { Games } from 'src/app/models/games.model';
import { Options } from 'src/app/models/options.model';
import { Player } from 'src/app/models/player.model';
import { Rounds } from 'src/app/models/rounds.model';
import { GamesService } from 'src/app/service/games/games.service';
import { OptionService } from 'src/app/service/option/option.service';
import { RoundService } from 'src/app/service/round/round.service';
import { GameStrategy, RockPaperScissorsStrategy } from 'src/app/interface/game-strategy';
import { GameManagerService } from 'src/app/service/gameManager.service';
import { RoundGame } from 'src/app/models/round-game.model';
import { RoundGameService } from 'src/app/service/roundGame/round-game.service';

@Component({
  selector: 'app-games-rounds',
  templateUrl: './games-rounds.component.html',
  styleUrls: ['./games-rounds.component.scss'],
})
export class GamesRoundsComponent implements OnInit {
  resultRound: [number, Player, string][] = [];
  roundActual!: Rounds;
  shift: boolean = true;
  optionPlaye1!: string;
  optionPlayer2!: string;
  playerActive!: Player;
  player1!: Player;
  player2!: Player;
  winer: boolean = true;
  victoriesPlayer1: number = 0;
  victoriesPlayer2: number = 0;
  game!: Games;
  playerWinnerRound!: Player | null;
  strategy: GameStrategy = new RockPaperScissorsStrategy(); // Inicializa la estrategia
  round: number = 1;
  victory: boolean = false;

  constructor(
    private readonly servicesServer: GameManagerService,
    private readonly roundService: RoundService,
    private readonly gamesService: GamesService,
    private readonly roundGameService: RoundGameService
  ) { }

  ngOnInit(): void {
    this.player1 = this.servicesServer.getLocalStorage('Player1') || {};
    this.player2 = this.servicesServer.getLocalStorage('Player2') || {};
    this.roundActual = this.servicesServer.getLocalStorageRound('Round') || new Rounds();
    this.playerActive = this.player1;

  }

  chooseOption(option: string) {
    if (this.shift) {
      this.shift = false;
      this.playerActive = this.player2;
      this.optionPlaye1 = option;
    } else {
      this.shift = true;
      this.playerActive = this.player1;
      this.optionPlayer2 = option;
      this.winer = false;
      this.winnerRound();
      this.round++;
    }
  }

  continuar() {
    if (this.victoriesPlayer1 === 3 || this.victoriesPlayer2 === 3) {
      this.victory = true;
    } else {
      const gameData = sessionStorage.getItem('Game');
      if (gameData) {
        this.game = JSON.parse(gameData);
      }
      const newRound: Rounds = {
        aux: 'auxiliar',
        Id_Game: this.game.Id ?? '2',
      };

      this.roundService.createRound(newRound).subscribe(
        (response) => {
          sessionStorage.setItem('Round', JSON.stringify(response));
          this.roundActual = response
        },
        (error) => {
          console.error('Error al crear el jugador:', error);
        }
      );

      this.winer = true;
    }
  }

  winnerRound() {
    const result = this.strategy.determineWinner(this.optionPlaye1, this.optionPlayer2);
    if (result === 1) {
      this.victoriesPlayer1++;
      this.playerWinnerRound = this.player1;
      this.servicesServer.createGameRound(this.optionPlaye1, this.player1, this.roundActual, true)
      this.servicesServer.createGameRound(this.optionPlayer2, this.player2, this.roundActual, false)

    } else if (result === 2) {
      this.victoriesPlayer2++;
      this.playerWinnerRound = this.player2;

      this.servicesServer.createGameRound(this.optionPlaye1, this.player1, this.roundActual, false)
      this.servicesServer.createGameRound(this.optionPlayer2, this.player2, this.roundActual, true)

    } else {
      this.playerWinnerRound = null;


      this.servicesServer.createGameRound(this.optionPlaye1, this.player1, this.roundActual, false)
      this.servicesServer.createGameRound(this.optionPlayer2, this.player2, this.roundActual, false)

    }
    this.SelectOption(this.round, this.player1, result === 1 ? '1' : result === 0 ? '2' : '0');
    this.SelectOption(this.round, this.player2, result === 2 ? '1' : result === 0 ? '2' : '0');
  }

  SelectOption(round: number, player: Player, option: string) {
    this.resultRound.push([round, player, option]);
  }

  playAgain() {
    const newGame: Game = {
      nombre: '1',
    };
    this.gamesService.createGame(newGame).subscribe(
      (response) => {
        sessionStorage.setItem('Game', JSON.stringify(response));

        const newRound: Rounds = {
          aux: 'auxiliar',
          Id_Game: response.id ?? '2',
        };

        console.log(newRound);
        this.roundService.createRound(newRound).subscribe(
          (response) => {
            this.roundActual = response
            console.log(response)
            sessionStorage.setItem('Round', JSON.stringify(response));
            window.location.reload();
          },
          (error) => {
            console.error('Error al crear el jugador:', error);
          }
        );
      },
      (error) => {
        console.error('Error al crear el jugador:', error);
      }
    );
  }
}
