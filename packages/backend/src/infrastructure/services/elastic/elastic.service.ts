import { IElasticService } from '@domain/services';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { movieMapping } from './mappings';
import { Movie } from '@domain/models';
import {
  IMovieParamsWeights,
  IRecommendationFilters,
  PaginatedEntity,
} from '@domain/contracts';
import { SearchTotalHits } from '@elastic/elasticsearch/lib/api/types';

const LIMIT = 5;
const OFFSET = 5;

@Injectable()
export class ElasticService implements IElasticService {
  constructor(private readonly client: ElasticsearchService) {
    this.init().then(() => console.log('Init elastic'));
  }

  async init(): Promise<void> {
    await this.checkIfExistIndex();
  }

  // async getMovie(movie: Movie): Promise<void> {
  //   const genres = movie.genres.map(el => el.name);
  //   const countries = movie.countries.map(el => el.name);
  //   const directors = movie.directors.map(el => `${el.name} ${el.surname}`);
  //   const actors = movie.actors.map(el => `${el.name} ${el.surname}`);

  //   await this.client.index({
  //     index: "movies",
  //     id: movie.id,
  //     document: {
  //       ...movie,
  //       genres,
  //       countries,
  //       directors,
  //       actors
  //     },
  //   }).then(console.log);
  // }

  async createMovie(movie: Movie): Promise<void> {
    const genres = movie.genres.map((el) => el.name);
    const countries = movie.countries.map((el) => el.name);
    const directors = movie.directors.map((el) => `${el.name} ${el.surname}`);
    const actors = movie.actors.map((el) => `${el.name} ${el.surname}`);

    await this.client
      .index({
        index: 'movies',
        id: movie.id,
        document: {
          ...movie,
          genres,
          countries,
          directors,
          actors,
        },
      })
      .then(console.log);
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

    await this.client
      .index({
        index: 'movies',
        id: movie.id,
        document: {
          ...movie,
          genres,
          countries,
          directors,
          actors,
        },
      })
      .then(console.log);
  }

  async getMoviesFunctionScore(
    weights: IMovieParamsWeights,
    viewedMovieIds: string[],
    filters?: IRecommendationFilters,
  ): Promise<PaginatedEntity<string[]>> {
    const query = {
      query: {
        function_score: {
          query: {
            bool: {
              must_not: {
                ids: {
                  values: viewedMovieIds,
                },
              },
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

    console.log(query);

    const res = await this.client.search({
      index: 'movies',
      ...query,
    });

    console.log(res.hits.hits);

    return {
      data: res.hits.hits.map((el) => el._id),
      count: (res.hits.total as SearchTotalHits).value,
    };

    //return res
  }

  async getMoviesColdstart(
    bookmarkIds: string[],
    viewedMovieIds: string[],
    filters?: IRecommendationFilters,
  ): Promise<PaginatedEntity<string[]>> {
    const limitations = [];

    console.log(filters);

    if (filters?.title) {
      limitations.push({
        'match_phrase_prefix': {
          'title': filters?.title,
        },
      });
    }

    if (filters.genres && filters.genres.length) {
      limitations.push({
        'terms': {
          'genres': filters.genres,
        },
      });
    }

    if (filters.countries && filters.countries.length) {
      limitations.push({
        'terms': {
          'countries': filters.countries,
        },
      });
    }

    if (filters.actors && filters.actors.length) {
      limitations.push({
        'terms': {
          'actors': filters.actors,
        },
      });
    }

    if (filters.directors && filters.directors.length) {
      limitations.push({
        'terms': {
          'directors': filters.directors,
        },
      });
    }

    console.log(limitations);

    const query = {
      explain: 'true',
      query: {
        function_score: {
          'query': {
            bool: {
              must: [
                {
                  'bool': {
                    'must': [
                      ...limitations,
                      // {
                      //   "terms": {
                      //     "genres": ["Comedy", "Drama"]
                      //   }
                      // },
                      // {
                      //   "fuzzy": {
                      //     'title': {
                      //       "value": "rev",
                      //       "fuzziness": "AUTO"
                      //     }

                      //   }
                      // },
                      // {
                      //   "match_phrase_prefix": {
                      //     "title": "ant"
                      //   }
                      // }
                    ],
                  },
                },
                {
                  'bool': {
                    must_not: {
                      ids: {
                        values: viewedMovieIds,
                      },
                    },
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
              weight: 1.4,
            },
            {
              gauss: {
                releaseDate: {
                  origin: 'now',
                  scale: '1825d',
                  decay: '0.9',
                },
              },
              weight: 1.4,
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
          score_mode: 'multiply',
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

    console.log(res);

    //console.log(JSON.stringify(res.hits.hits[0]._explanation));

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

    console.log(res);

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
              number_of_replicas: 0, // for local development
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
}
