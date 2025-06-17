import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { GamesService } from "../../services/games-service/games.service";

@Component({
  selector: "app-page-game-select",
  imports: [MatButtonModule],
  templateUrl: "./page-game-select.html",
})
export class PageGameSelect {
  private gameService = inject(GamesService);

  protected async createGame() {
    await this.gameService.createGame();
  }
}
