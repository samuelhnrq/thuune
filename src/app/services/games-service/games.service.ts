import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  type DocumentData,
  type FirestoreDataConverter,
  Firestore,
  collection,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  addDoc,
  collectionData,
  query,
  where,
  doc,
  updateDoc,
  docData,
  arrayUnion,
} from '@angular/fire/firestore';
import { type Game, gameModel } from './games.model';
import {
  catchError,
  EMPTY,
  mergeMap,
  Observable,
  of,
  retry,
  throwError,
} from 'rxjs';
import { FirebaseError } from '@angular/fire/app';
import { ArtistService } from '../artist-service/artist-service';
import type { MBArtist } from '../music-brainz/music-brainz.model';

function wait(ms = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const converter = {
  toFirestore(game: Game): DocumentData {
    return game;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options?: SnapshotOptions
  ): Game {
    const data = snapshot.data(options);
    const current = gameModel.parse({ ...data, _id: snapshot.id });
    return current;
  },
} satisfies FirestoreDataConverter<Game>;

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private auth = inject(Auth);
  private db = inject(Firestore);
  gamesCol = collection(this.db, 'games').withConverter(converter);
  private artistsService = inject(ArtistService);

  async createGame() {
    const game = gameModel.parse({
      name: 'New Game',
      answer: crypto.randomUUID(),
      createdBy: this.auth.currentUser?.uid,
    });
    await addDoc(this.gamesCol, game);
  }

  listGames(): Observable<Game[]> {
    return authState(this.auth).pipe(
      mergeMap((u) => {
        if (!u) {
          return of([]);
        }
        return collectionData(
          query(this.gamesCol, where('createdBy', '==', u.uid))
        );
      }),
      retry()
    );
  }

  getGame(gameId: string): Observable<Game | undefined> {
    return docData(doc(this.gamesCol, gameId)).pipe(
      catchError((err, caught) => {
        if (err instanceof FirebaseError) {
          if (err.code === 'permission-denied') {
            return throwError(() => err);
          }
          return EMPTY;
        }
        return caught;
      })
    );
  }

  guessArtist(gameId: string, artist: MBArtist) {
    this.artistsService.upsertArtist(artist).catch((err) => {
      console.error('Error upserting artist:', err);
    });
    const ref = doc(this.gamesCol, gameId);
    const res = updateDoc(ref, {
      guesses: arrayUnion(artist.id),
    });
    return Promise.race([res, wait(1000)]);
  }
}
