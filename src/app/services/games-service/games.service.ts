import { inject, Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import {
  type DocumentData,
  type FirestoreDataConverter,
  Firestore,
  collection,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  addDoc,
} from "@angular/fire/firestore";
import { type Game, gameModel } from "./games.model";

const converter = {
  toFirestore(game: Game): DocumentData {
    return { ...game };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options?: SnapshotOptions,
  ): Game {
    const current = snapshot.data(options) as Game;
    return { ...current, _id: snapshot.id };
  },
} satisfies FirestoreDataConverter<Game>;

@Injectable({
  providedIn: "root",
})
export class GamesService {
  private auth = inject(Auth);
  private db = inject(Firestore);
  gamesCol = collection(this.db, "games").withConverter(converter);

  async createGame() {
    console.log(this.auth.currentUser?.uid);
    await addDoc(
      this.gamesCol,
      gameModel.parse({
        name: "New Game",
        answer: crypto.randomUUID(),
        createdBy: this.auth.currentUser?.uid,
      }),
    );
  }
}
