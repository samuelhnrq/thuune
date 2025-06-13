import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MBArtist } from '../../services/music-brainz/music-brainz.model';
import { debounceTime, mergeMap, Observable, distinctUntilChanged } from 'rxjs';
import { MusicBrainz } from '../../services/music-brainz/music-brainz.service';
import { Analytics, logEvent } from '@angular/fire/analytics';

@Component({
  selector: 'app-artist-search',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './artist-search.html',
})
export class ArtistSearch {
  myControl = new FormControl<string | MBArtist>('');
  filteredOptions: Observable<MBArtist[]>;
  private analytics = inject(Analytics);

  constructor(private search: MusicBrainz) {
    // Initialize filteredOptions with an observable that emits an empty array
    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged(),
      mergeMap((value: string | MBArtist | null) => {
        if (!value) {
          return [];
        }
        if (typeof value === 'string') {
          return this.search.searchArtist(value);
        } else {
          return this.search.searchArtist(value.name);
        }
      })
    );
  }

  protected displayFn(artist: MBArtist): string {
    // If artist is null or undefined, return an empty string
    if (!artist) {
      return '';
    }
    // Return the artist's name
    return artist.name;
  }

  protected onOptionSelected(event: MBArtist): void {
    console.log('Selected artist:', event.name);
    logEvent(this.analytics, 'artist_selected', {
      artist_name: event.name,
      artist_id: event.id,
    });
  }
}
