import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayersService } from 'src/app/service/players/players.service';
import { PlayersBoxComponent } from 'src/app/shared/players-box/players-box.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports:[PlayersBoxComponent],
  standalone: true,
})
export class GameComponent implements OnInit {

  constructor(
    private readonly playersService: PlayersService
  ) {
  }

  player1!: string;
  player2!: string;

  ngOnInit(): void {

  }

  savePlayer(player: string) {
    const newPlayer: Player = {
        name: player || ''
    };


    this.playersService.createPlayer(newPlayer).subscribe(
        (response) => {
            console.log('Jugador creado:', response);
            sessionStorage.setItem('Player', JSON.stringify(response));
        },
        (error) => {
            console.error('Error al crear el jugador:', error);
        }
    );
}
}
