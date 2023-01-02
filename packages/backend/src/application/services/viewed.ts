import { IViewedService, IMovieService, IUserService } from '@domain/services';
import { IViewedRepository } from '@domain/repository';
import { Viewed } from '@domain/models';
import { BaseNotFoundError } from '@application/exeptions/base';
import {
  CreateViewed,
  IMovieFilters,
  PaginatedEntity,
} from '@domain/contracts';
import { EntityAlreadyExistError } from '@application/exeptions';

export class ViewedService implements IViewedService {
  constructor(
    private movieService: IMovieService,
    private userService: IUserService,
    private viewedRepository: IViewedRepository,
  ) {}

  async getById(id: string, userId: string): Promise<Viewed> {
    const viewed = await this.viewedRepository.getById(id, userId);

    if (!viewed) {
      throw new BaseNotFoundError('Viewed not found!');
    }

    return viewed;
  }

  async create(data: CreateViewed): Promise<Viewed> {
    const viewed = await this.viewedRepository.getByUserIdAndMovieId(
      data.userId,
      data.movieId,
    );

    if (viewed) {
      throw new EntityAlreadyExistError('Viewed');
    }

    const movie = await this.movieService.getById(data.movieId);

    const user = await this.userService.getPublicProfile(data.userId);

    delete data.movieId;
    delete data.userId;

    const viewedCreated = await this.viewedRepository.create({
      ...data,
      movie,
      user,
    });

    if (!viewedCreated.private) {
      await this.movieService.addRateToAverageRating(
        viewedCreated.movie.id,
        viewedCreated.rate,
      );
    }

    return viewedCreated;
  }

  async updateById(id: string, data: CreateViewed): Promise<Viewed> {
    const viewed = await this.getById(id, data.userId);

    const movie = await this.movieService.getById(data.movieId);

    const user = await this.userService.getPublicProfile(data.userId);

    delete data.movieId;
    delete data.userId;

    const viewedUpdated = await this.viewedRepository.update(id, {
      ...data,
      movie,
      user,
    });

    if (viewed.private && !viewedUpdated.private) {
      await this.movieService.addRateToAverageRating(
        viewedUpdated.movie.id,
        viewedUpdated.rate,
      );
    } else if (!viewed.private && viewedUpdated.private) {
      await this.movieService.deleteRateFromAverageRating(
        viewed.movie.id,
        viewed.rate,
      );
    } else if (!viewed.private && !viewedUpdated.private) {
      await this.movieService.addRateToAverageRating(
        viewedUpdated.movie.id,
        viewedUpdated.rate,
        viewed.rate,
      );
    }

    return viewedUpdated;
  }

  async deleteByMovieId(movieId: string, userId: string): Promise<Viewed> {
    const viewed = await this.viewedRepository.getByUserIdAndMovieId(
      userId,
      movieId,
    );

    if (!viewed) {
      throw new BaseNotFoundError('Viewed not found!');
    }

    const deletedViewed = await this.viewedRepository.deleteById(viewed.id);

    if (!viewed.private) {
      await this.movieService.deleteRateFromAverageRating(
        movieId,
        deletedViewed.rate,
      );
    }

    return deletedViewed;
  }

  getUserViewed(
    userId: string,
    filters: IMovieFilters,
  ): Promise<PaginatedEntity<Viewed[]>> {
    return this.viewedRepository.getUserViewed(userId, filters);
  }

  getMovieIdsInViewed(userId: string): Promise<string[]> {
    return this.viewedRepository.getMovieIdsInViewed(userId);
  }
}
