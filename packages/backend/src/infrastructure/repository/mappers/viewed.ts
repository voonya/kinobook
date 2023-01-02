import { BaseUser } from '@domain/models';
import { mapMovie } from './movie';
import { Viewed as ViewedPrisma } from '@prisma/client';
import { PrismaMovieIncluded } from './movie';

type ViewedPrismaIncluded = ViewedPrisma & {
  movie: PrismaMovieIncluded;
  user: BaseUser;
};

export const mapViewed = (viewed: ViewedPrismaIncluded) => ({
  ...viewed,
  rate: viewed.rate && Number(viewed.rate),
  movie: mapMovie(viewed.movie),
});
