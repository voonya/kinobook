import { Bookmark } from '@domain/models';
import { IBookmarkRepository } from '@domain/repository';
import { PrismaService } from '../prisma/prisma';
import { Inject, forwardRef } from '@nestjs/common';

export class BookmarkRepository implements IBookmarkRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {}

  create(userId: string, movieId: string): Promise<Bookmark> {
    return this.prisma.bookmarks.create({ data: { userId, movieId } });
  }

  async deleteById(id: string): Promise<Bookmark> {
    return await this.prisma.bookmarks.delete({ where: { id } });
  }

  getByUserIdAndMovieId(userId: string, movieId: string): Promise<Bookmark> {
    return this.prisma.bookmarks.findFirst({ where: { userId, movieId } });
  }

  async getMoviesIdInUserBookmarks(userId: string): Promise<string[]> {
    const moviesInBookmarks = await this.prisma.bookmarks.findMany({
      where: {
        userId,
      },
    });

    return moviesInBookmarks.map((el) => el.movieId);
  }
}
