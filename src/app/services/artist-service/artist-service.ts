import { inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  increment,
  setDoc,
} from '@angular/fire/firestore';
import type { MBArtist } from '../music-brainz/music-brainz.model';
import { ArtistConverter, type Artist } from './artist.model';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private db = inject(Firestore);
  private artistsCollection = collection(this.db, 'artists').withConverter(
    new ArtistConverter()
  );

  public async upsertArtist(artist: MBArtist): Promise<Artist> {
    const newArtist: Artist = {
      id: artist.id,
      name: artist.name,
      genre: 'placeholder',
      country: artist.country || '',
      gender: 'other',
      members: 1,
      guesses: 0,
    };
    setDoc(
      doc(this.artistsCollection, artist.id),
      { ...newArtist, guesses: increment(1) },
      { merge: true }
    );
    return newArtist;
  }
}
