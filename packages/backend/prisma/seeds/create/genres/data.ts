import { Genre } from '@domain/models';
import { randomUUID } from 'crypto';

export const mockGenres: Genre[] = [
  {
    id: randomUUID(),
    name: 'Action',
  },
  {
    id: randomUUID(),
    name: 'Animation',
  },
  {
    id: randomUUID(),
    name: 'Comedy',
  },
  {
    id: randomUUID(),
    name: 'Crime',
  },
  {
    id: randomUUID(),
    name: 'Drama',
  },
  {
    id: randomUUID(),
    name: 'Experimental',
  },
  {
    id: randomUUID(),
    name: 'Fantasy',
  },
  {
    id: randomUUID(),
    name: 'Historical',
  },
  {
    id: randomUUID(),
    name: 'Horror',
  },
  {
    id: randomUUID(),
    name: 'Romance',
  },
  {
    id: randomUUID(),
    name: 'Science Fiction',
  },
  {
    id: randomUUID(),
    name: 'Thriller',
  },
  {
    id: randomUUID(),
    name: 'Western',
  },
];
