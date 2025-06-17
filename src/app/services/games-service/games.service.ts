import { Injectable } from '@angular/core';
import type { Auth } from '@angular/fire/auth';
import {
  type CollectionReference,
  type DocumentData,
  type FirestoreDataConverter,
  type Firestore,
  collection,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  addDoc,
} from '@angular/fire/firestore';
import { type Game, gameModel } from './games.model';

class GameConverter implements FirestoreDataConverter<Game> {
  toFirestore(game: Game): DocumentData {
    return { ...game };
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options?: SnapshotOptions
  ): Game {
    const current = snapshot.data(options) as Game;
    return { ...current, _id: snapshot.id };
  }
}

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  gamesCol: CollectionReference<Game>;

  constructor(private auth: Auth, db: Firestore) {
    this.gamesCol = collection(db, 'games').withConverter(new GameConverter());
  }

  async createGame() {
    await addDoc(
      this.gamesCol,
      gameModel.parse({
        name: 'New Game',
        answer: crypto.randomUUID(),
        createdBy: this.auth.currentUser?.uid,
      })
    );
  }
}
