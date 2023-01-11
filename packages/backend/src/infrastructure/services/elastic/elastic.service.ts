import { IElasticService } from '@domain/services';
import { Movie } from '@domain/models';
import {
  IMovieParamsWeights,
  IRecommendationFilters,
  PaginatedEntity,
} from '@domain/contracts';
import { movieMapping } from './mappings';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchTotalHits } from '@elastic/elasticsearch/lib/api/types';

const LIMIT = 10;
const OFFSET = 0;

@Injectable()
export class ElasticService implements IElasticService {
  constructor(private readonly client: ElasticsearchService) {
    this.init().then(() => console.log('Init elastic'));
  }

  async init(): Promise<void> {
    await this.checkIfExistIndex();
  }

  async createMovie(movie: Movie): Promise<void> {
    const genres = movie.genres.map((el) => el.name);
    const countries = movie.countries.map((el) => el.name);
    const directors = movie.directors.map((el) => `${el.name} ${el.surname}`);
    const actors = movie.actors.map((el) => `${el.name} ${el.surname}`);

    await this.client.index({
      index: 'movies',
      id: movie.id,
      document: {
        ...movie,
        genres,
        countries,
        directors,
        actors,
      },
    });
  }

  async deleteMovie(id: string): Promise<void> {
    await this.client.delete({
      index: 'movies',
      id,
    });
  }

  async updateMovie(id: string, movie: Movie): Promise<void> {
    const genres = movie.genres.map((el) => el.name);
    const countries = movie.countries.map((el) => el.name);
    const directors = movie.directors.map((el) => `${el.name} ${el.surname}`);
    const actors = movie.actors.map((el) => `${el.name} ${el.surname}`);

    await this.client.index({
      index: 'movies',
      id: movie.id,
      document: {
        ...movie,
        genres,
        countries,
        directors,
        actors,
      },
    });
  }

  async getMoviesFunctionScore(
    weights: IMovieParamsWeights,
    viewedMovieIds: string[],
    filters?: IRecommendationFilters,
  ): Promise<PaginatedEntity<string[]>> {
    const limitations = this.getFiltersLimitations(filters);

    const query = {
      query: {
        function_score: {
          query: {
            bool: {
              must: [...limitations],
              must_not: [
                {
                  ids: {
                    values: viewedMovieIds,
                  },
                },
              ],
            },
          },
          functions: [],
          score_mode: 'sum',
          boost_mode: 'sum',
          min_score: 1,
        },
      },
      size: filters?.limit || LIMIT,
      from: filters?.offset || OFFSET,
    };

    Object.keys(weights).forEach((key) => {
      switch (key) {
        case 'title':
        case 'description':
          weights[key].forEach((el) =>
            query.query.function_score.functions.push(
              this.queryText(el.value, key, el.weight),
            ),
          );
          break;
        default:
          weights[key].forEach((el) =>
            query.query.function_score.functions.push(
              this.queryTerm(el.value, key, el.weight),
            ),
          );
          break;
      }
    });

    const res = await this.client.search({
      index: 'movies',
      ...query,
    });

    return {
      data: res.hits.hits.map((el) => el._id),
      count: (res.hits.total as SearchTotalHits).value,
    };
  }

  async getMoviesColdstart(
    bookmarkIds: string[],
    viewedMovieIds: string[],
    filters?: IRecommendationFilters,
  ): Promise<PaginatedEntity<string[]>> {
    const limitations = this.getFiltersLimitations(filters);

    const query = {
      explain: 'true',
      query: {
        function_score: {
          query: {
            bool: {
              must: [...limitations],
              must_not: [
                {
                  ids: {
                    values: viewedMovieIds,
                  },
                },
              ],
            },
          },
          functions: [
            {
              filter: {
                ids: {
                  values: bookmarkIds,
                },
              },
              weight: 2,
            },
            {
              gauss: {
                releaseDate: {
                  origin: 'now',
                  scale: '1825d',
                  decay: '0.99',
                },
              },
            },
            {
              field_value_factor: {
                field: 'averageRate',
                modifier: 'sqrt',
                missing: 0,
                factor: 1,
              },
            },
          ],
          score_mode: 'sum',
          boost_mode: 'sum',
          min_score: 1,
        },
      },
      size: filters?.limit || LIMIT,
      from: filters?.offset || OFFSET,
    };

    const res = await this.client.search({
      index: 'movies',
      ...query,
    });

    return {
      data: res.hits.hits.map((el) => el._id),
      count: (res.hits.total as SearchTotalHits).value,
    };
  }

  async getSimilarMovie(movieId: string, count: number): Promise<string[]> {
    const query = {
      query: {
        more_like_this: {
          like: [
            {
              _id: movieId,
            },
          ],
          fields: ['title', 'genres', 'directors'],
          min_term_freq: 1,
          min_doc_freq: 1,
        },
      },
      size: count,
    };

    const res = await this.client.search({
      index: 'movies',
      ...query,
    });

    return res.hits.hits.map((el) => el._id);
  }

  private queryText(value: string, fieldName: string, weight: number) {
    if (weight < 0) {
      return {
        filter: {
          bool: {
            must_not: {
              match: {
                [fieldName]: value,
              },
            },
          },
        },
        weight: weight * -1,
      };
    }

    return {
      filter: { match: { [fieldName]: value } },
      weight,
    };
  }

  private queryTerm(value: string, fieldName: string, weight: number) {
    if (weight < 0) {
      return {
        filter: {
          bool: {
            must_not: {
              terms: {
                [fieldName]: [value],
              },
            },
          },
        },
        weight: weight * -1,
      };
    }

    return {
      filter: { terms: { [fieldName]: [value] } },
      weight,
    };
  }

  private async checkIfExistIndex() {
    return this.client.indices
      .exists({
        index: 'movies',
      })
      .then((res) => {
        if (!res) {
          return this.createMovieIndex();
        }
      });
  }

  private async createMovieIndex() {
    return this.client.indices
      .create({
        index: 'movies',
        body: {
          settings: {
            index: {
              number_of_replicas: 0,
            },
          },
        },
      })
      .then(() => this.putMapping());
  }

  private async putMapping() {
    return this.client.indices.putMapping({
      index: 'movies',
      ...movieMapping,
    });
  }

  private getFiltersLimitations(filters: IRecommendationFilters) {
    const limitations = [];

    limitations.push({
      query_string: {
        default_field: 'title',
        'query': `*${filters.title || ''}*`,
      },
    });

    if (filters.genres && filters.genres.length) {
      limitations.push({
        'terms': {
          'genres.keyword': filters.genres,
        },
      });
    }

    if (filters.countries && filters.countries.length) {
      limitations.push({
        'terms': {
          'countries.keyword': filters.countries,
        },
      });
    }

    if (filters.actors && filters.actors.length) {
      limitations.push({
        'terms': {
          'actors.keyword': filters.actors,
        },
      });
    }

    if (filters.directors && filters.directors.length) {
      limitations.push({
        'terms': {
          'directors.keyword': filters.directors,
        },
      });
    }

    if (filters.averageRate) {
      if (filters.averageRate.from >= 0) {
        limitations.push({
          range: {
            averageRate: {
              gte: filters.averageRate.from,
            },
          },
        });
      }

      if (filters.averageRate.to <= 5) {
        limitations.push({
          range: {
            averageRate: {
              lte: filters.averageRate.to,
            },
          },
        });
      }
    }

    if (filters.releaseDate) {
      if (filters.releaseDate.from) {
        limitations.push({
          range: {
            releaseDate: {
              gte: filters.releaseDate.from,
            },
          },
        });
      }

      if (filters.releaseDate.to) {
        limitations.push({
          range: {
            releaseDate: {
              lte: filters.releaseDate.to,
            },
          },
        });
      }
    }

    return limitations;
  }
}
