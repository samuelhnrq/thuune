import { Timestamp } from '@angular/fire/firestore';
import z from 'zod/v4';

function convertTimestamp(x: unknown) {
  if (x instanceof Timestamp) {
    return x.toDate();
  }
  return x;
}

export const gameModel = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .min(1, 'Game name is required')
    .max(100, 'Game name must be less than 100 characters'),
  answer: z.uuid('Answer must be a valid UUID'),
  guesses: z.array(z.string()).default([]),
  createdBy: z
    .string('Must specify id')
    .regex(
      /^(?!\.\.?$)(?!.*__.*__)([^/]{1,64})$/,
      'Created by must be a valid ID'
    ),
  createdAt: z.preprocess(convertTimestamp, z.date().default(new Date())),
  updatedAt: z.preprocess(convertTimestamp, z.date().default(new Date())),
});

export type Game = z.infer<typeof gameModel>;
