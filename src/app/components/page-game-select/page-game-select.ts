import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { GamesService } from '../../services/games-service/games.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-game-select',
  imports: [MatButtonModule, CommonModule, MatListModule, RouterModule],
  templateUrl: './page-game-select.html',
})
export class PageGameSelect {
  private gameService = inject(GamesService);
  protected gameList = this.gameService.listGames();

  protected async createGame() {
    await this.gameService.createGame();
  }
}
