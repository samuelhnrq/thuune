import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from '@angular/fire/firestore';
import { z } from 'zod/v4';

export const artist = z.object({
  id: z.uuid(),
  name: z.string().nonempty(),
  genre: z.string().nonempty(),
  country: z.string().length(2),
  gender: z.enum(['male', 'female', 'other']),
  members: z.int().positive(),
  guesses: z.int().nonnegative().default(0),
});

export type Artist = z.infer<typeof artist>;

export class ArtistConverter implements FirestoreDataConverter<Artist> {
  toFirestore(modelObject: Artist): WithFieldValue<DocumentData> {
    return modelObject;
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>
  ): Artist {
    const data = snapshot.data();
    if (!data) {
      throw new Error('No data found in snapshot');
    }
    return artist.parse({ ...data, id: snapshot.id });
  }
}
