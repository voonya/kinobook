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

    return this.viewedRepository.create({ ...data, movie, user });
  }

  async updateById(id: string, data: CreateViewed): Promise<Viewed> {
    await this.getById(id, data.userId);

    const movie = await this.movieService.getById(data.movieId);

    const user = await this.userService.getPublicProfile(data.userId);

    delete data.movieId;
    delete data.userId;

    return this.viewedRepository.update(id, { ...data, movie, user });
  }

  async deleteByMovieId(movieId: string, userId: string): Promise<Viewed> {
    const viewed = await this.viewedRepository.getByUserIdAndMovieId(
      userId,
      movieId,
    );

    if (!viewed) {
      throw new BaseNotFoundError('Viewed not found!');
    }

    return this.viewedRepository.deleteById(viewed.id);
  }

  getUserViewed(
    userId: string,
    filters: IMovieFilters,
  ): Promise<PaginatedEntity<Viewed[]>> {
    return this.viewedRepository.getUserViewed(userId, filters);
  }

  // getMovieViews(movieId: string, ): Promise<Viewed[]> {
  //   return this.viewedRepository.getMovieReview(movieId);
  // }
  getMovieIdsInViewed(userId: string): Promise<string[]> {
    return this.viewedRepository.getMovieIdsInViewed(userId);
  }
}
