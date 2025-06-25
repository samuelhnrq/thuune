import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ArtistSearch } from '../artist-search/artist-search';
import { ArtistDisplay } from '../artist-display/artist-display';
import type { MBArtist } from '../../services/music-brainz/music-brainz.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../../services/games-service/games.service';
import { shareReplay, take } from 'rxjs';

@Component({
  selector: 'app-page-game',
  imports: [ArtistSearch, ArtistDisplay, CommonModule],
  templateUrl: './page-game.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageGame {
  private activatedRoute = inject(ActivatedRoute);
  private gameService = inject(GamesService);
  protected routerParams = this.activatedRoute.snapshot.params;
  protected selectedArtists = signal<MBArtist[]>([]);
  protected currentGame = this.gameService
    .getGame(this.routerParams['gameId'])
    .pipe(shareReplay());

  protected onSelected(artist: MBArtist) {
    this.currentGame.pipe(take(1)).subscribe((game) => {
      if (!game?._id) {
        console.error('Game not found');
        return;
      }
      this.gameService.guessArtist(game._id, artist);
      this.selectedArtists.update((old) => old.concat(artist));
    });
  }
}

export default PageGame;
