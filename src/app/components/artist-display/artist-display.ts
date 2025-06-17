import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { MBArtist } from '../../services/music-brainz/music-brainz.model';

@Component({
  selector: 'app-artist-display',
  imports: [],
  templateUrl: './artist-display.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDisplay {
  artist = input.required<MBArtist>();
}
