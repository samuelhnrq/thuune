import { AsyncPipe, CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EnvironmentInjector,
  inject,
  output,
  runInInjectionContext,
  signal,
} from "@angular/core";

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatInputModule } from "@angular/material/input";
import type { MBArtist } from "../../services/music-brainz/music-brainz.model";
import {
  debounceTime,
  mergeMap,
  type Observable,
  distinctUntilChanged,
  retry,
  map,
  merge,
} from "rxjs";
import type { MusicBrainz } from "../../services/music-brainz/music-brainz.service";
import { Analytics, logEvent } from "@angular/fire/analytics";

@Component({
  selector: "app-artist-search",
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressBarModule,
    AsyncPipe,
  ],
  templateUrl: "./artist-search.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistSearch {
  private environmentInjector = inject(EnvironmentInjector);
  private analytics = inject(Analytics);

  protected myControl = new FormControl<string | MBArtist>("");
  protected searchText = signal<string>("");
  protected filteredOptions: Observable<MBArtist[]>;
  protected isLoading: Observable<boolean>;
  selected = output<MBArtist>();

  constructor(private search: MusicBrainz) {
    // Initialize filteredOptions with an observable that emits an empty array

    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(800), // Wait for 300ms pause in events
      distinctUntilChanged(),
      mergeMap((value: string | MBArtist | null) => {
        if (!value) {
          return [];
        }
        if (typeof value === "string") {
          return this.search.searchArtist(value);
        }
        return this.search.searchArtist(value.name);
      }),
      retry(),
    );
    this.isLoading = merge(
      this.myControl.valueChanges.pipe(map((x) => !!x)),
      this.filteredOptions.pipe(map(() => false)),
    );
  }

  protected displayFn(artist: MBArtist): string {
    // If artist is null or undefined, return an empty string
    if (!artist) {
      return "";
    }
    // Return the artist's name
    return artist.name;
  }

  protected onOptionSelected(event: MBArtist): void {
    this.myControl.reset();
    this.selected.emit(event);
    runInInjectionContext(this.environmentInjector, () => {
      logEvent(this.analytics, "artist_selected", {
        artist_name: event.name,
        artist_id: event.id,
      });
    });
  }
}
