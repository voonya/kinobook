import { BaseUser } from '@domain/models';
import { mapMovie } from './movie';
import { Viewed as ViewedPrisma, Movie as MoviePrisma } from '@prisma/client';

type ViewedPrismaIncluded = ViewedPrisma & {
  movie: MoviePrisma;
  user: BaseUser;
};

export const mapViewed = (viewed: ViewedPrismaIncluded) => ({
  ...viewed,
  rate: viewed.rate && Number(viewed.rate),
  movie: mapMovie(viewed.movie),
});
