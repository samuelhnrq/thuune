import z from 'zod/v4';

export const gameModel = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .min(1, 'Game name is required')
    .max(100, 'Game name must be less than 100 characters'),
  answer: z.uuid('Answer must be a valid UUID'),
  guesses: z.array(z.string()).default([]),
  createdBy: z.uuid('Created by must be a valid UUID'),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export type Game = z.infer<typeof gameModel>;
