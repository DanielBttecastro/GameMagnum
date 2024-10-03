 export interface GameStrategy {
  determineWinner(player1Option: string, player2Option: string): number; // Retorna 1 si gana jugador 1, 2 si gana jugador 2, 0 si es empate
}

export class RockPaperScissorsStrategy implements GameStrategy {
  determineWinner(player1Option: string, player2Option: string): number {
    if (player1Option === player2Option) return 0; // Empate
    if ((player1Option === "1" && player2Option === "3") ||
        (player1Option === "2" && player2Option === "1") ||
        (player1Option === "3" && player2Option === "2")) {
      return 1; // Gana jugador 1
    } else {
      return 2; // Gana jugador 2
    }
  }
}
