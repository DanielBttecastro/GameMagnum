import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Player } from 'src/app/models/player.model';
import { PlayersService } from 'src/app/service/players/players.service';
import { Router } from '@angular/router';
import { GameManagerService } from 'src/app/service/gameManager.service';

@Component({
  selector: 'app-players-box',
  templateUrl: './players-box.component.html',
  styleUrls: ['./players-box.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class PlayersBoxComponent implements OnInit {

  @Input() namePlayer!: string;
  @Input() number!: string;

  contPlayer: number = 0;

  playerCreated: boolean = false
  errorCreated: boolean = false
  player!: string;

  constructor(
    private readonly playersService: PlayersService,
    private readonly gameManagerService: GameManagerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  savePlayer(player: string) {
    this.errorCreated=false
    if (!player || player.length === 0) {
      this.errorCreated=true
    } else {
      const newPlayer: Player = {
        name: player || ''
      };


      this.playersService.createPlayer(newPlayer).subscribe(
        (response) => {
          sessionStorage.setItem('Player' + this.number, JSON.stringify(response));
          this.playerCreated = true;
          this.gameManagerService.incrementPlayer();
          console.log(this.contPlayer)
          if (this.contPlayer == 2) {
            this.router.navigate(['/Round']);
          }
        },
        (error) => {
          console.error('Error al crear el jugador:', error);
        }
      );
    }
  }
  closeError(){
    this.errorCreated=false
  }
}
