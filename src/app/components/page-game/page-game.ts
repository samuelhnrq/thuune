import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ArtistSearch } from '../artist-search/artist-search';
import { ArtistDisplay } from '../artist-display/artist-display';
import { MBArtist } from '../../services/music-brainz/music-brainz.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-game',
  imports: [ArtistSearch, ArtistDisplay, CommonModule],
  templateUrl: './page-game.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageGame {
  protected selectedArtists = signal<MBArtist[]>([]);

  protected onSelected(artist: MBArtist) {
    this.selectedArtists.update((old) => old.concat(artist));
  }
}
