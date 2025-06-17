import type { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import type { MBQueryResult } from './music-brainz.model';

const FORBIDDEN = /\+|-|&&|\|\||!|(|)|{|}|[|]|\^|"|~|\*|\?|:|\\|\/|;/g;

@Injectable({
  providedIn: 'root',
})
export class MusicBrainz {
  constructor(private client: HttpClient) {}

  public searchArtist(artist: string) {
    const clean = artist.replaceAll(FORBIDDEN, '');
    console.debug(`Searching for artist: '${clean}'`);
    if (clean.length < 3) {
      return [];
    }
    return this.client
      .get<MBQueryResult>('https://musicbrainz.org/ws/2/artist/', {
        params: {
          fmt: 'json',
          query: `"${clean}" AND -name:*`,
        },
      })
      .pipe(map((x) => x.artists));
  }
}
