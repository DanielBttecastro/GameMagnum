import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/service/games/games.service';
import { Router } from '@angular/router';
import { RoundService } from 'src/app/service/round/round.service';
import { Rounds } from 'src/app/models/rounds.model';
import { Games } from 'src/app/models/games.model';
import { GameManagerService } from 'src/app/service/gameManager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message-home',
  templateUrl: './message-home.component.html',
  styleUrls: ['./message-home.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class MessageHomeComponent implements OnInit {
  listInfo!:Object;
  gamesList!: Game;
  InstructionsBool: Boolean = false;

  constructor(private readonly gameManagerService: GameManagerService,
    private readonly round: GameManagerService,
    private readonly gameService: GamesService,
  ) { }

  ngOnInit(): void {
    this.gameService.listInfo().subscribe(
      (game: any) => {  
        this.listInfo=game
      },
      (error) => {
        console.error('Error al listar los juego:', error);
      }
    );


  }



  showInstructions() {
    this.InstructionsBool = !this.InstructionsBool
  }

  //Iniciar Juego
  startGame() {
    this.gameManagerService.createGame("1")
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
