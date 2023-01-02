import { getPath } from '@infrastructure/helpers';
import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Controller(getPath('/search'))
export class SearchController {
  constructor(private readonly esService: ElasticsearchService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getAll(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    // const res = await this.esService.search({
    //   index: 'movies',
    //   query: {
    //     more_like_this: {
    //       fields: ['genres', 'title', 'description'],
    //       like: [
    //         {
    //           _index: 'movies',
    //           _id: id
    //         }
    //       ], min_term_freq: 1,
    //       max_query_terms: 12
    //     },

    //   },
    //   size: 5
    // })
    console.log('asassasassaasasasasassasdsdsasasdsdsas');
    const query = {
      // "explain": true,
      query: {
        'function_score': {
          'query': {
            'match_all': {},
          },
          'functions': [
            //   {
            //   "filter": {
            //     "bool": {
            //       "must_not": {
            //         "terms": { "genres": ["Thriller"] }
            //       }
            //     }
            //   },
            //   "weight": 4
            // },

            // {
            //   "script_score": {
            //     "script": {
            //       "source": "cosineSimilarity(params.query_vector, 'title') + 1.0",
            //       "params": {
            //         "query_vector": [
            //           0.5,
            //           0.5,
            //           0.5,
            //           0.5
            //         ]
            //       }
            //     }
            //   },
            //   "weight": -1
            // },
            // {
            //   "filter": {
            //     "match_phrase": {
            //       "tags_text": {
            //         "query": "god father",
            //         "slop": 100
            //       }
            //     }
            //   },
            //   "weight": 100
            // },

            // {
            //   "filter": {
            //     "match_phrase": {
            //       "title": "Baby driver"
            //     }

            //   },
            //   "weight": 0.2
            // },
            {
              'filter': {
                'bool': {
                  'must_not': {
                    'match': {
                      'title': 'Taxi driver',
                    },
                  },
                },
              },
              'weight': 2,
            },
            // {
            //   "filter": { "match": { "title": "Taxi driver" } },
            //   "weight": 0.1
            // },
            // {
            //   "filter": { "match": { "title": "father" } },
            //   "weight": 3
            // },
            // {
            //   "filter": { "match": { "title": "The Kid" } },
            //   "weight": 0.2
            // },
            {
              'filter': { 'terms': { 'genres': ['Crime'] } },
              'weight': 10,
            },
            // {
            //   "filter": { "terms": { "genres": ["Drama",] } },
            //   "weight": 3
            // },
            // {
            //   "filter": { "terms": { "genres": ["Comedy"] } },
            //   "weight": 1
            // },
          ],
          'score_mode': 'sum',
          'boost_mode': 'sum',
          'min_score': 1,
        },
      },
      size: 5,
    };

    const res = await this.esService.search({
      index: 'movies',
      ...query,
    });
    console.log(res);

    return res;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/')
  async create() {
    const res = await this.esService
      .index({
        index: 'movies',
        document: {
          title: 'test1',
          author: 'test author',
          content: 'test content',
        },
      })
      .then(console.log);

    return res;
  }

  private async createMovieIndex() {
    return this.esService.indices
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

  private async checkIfExistIndex() {
    return this.esService.indices
      .exists({
        index: 'movies',
      })
      .then((res) => {
        if (!res) {
          return this.createMovieIndex();
        }
      });
  }

  private async putMapping() {
    const mappings = {
      properties: {
        movieId: {
          type: 'text',
        },
        title: {
          type: 'text',
        },
        tagline: {
          type: 'text',
        },
        description: {
          type: 'text',
        },
        releaseDate: {
          type: 'date',
        },
        runtime: {
          type: 'integer',
        },
        budget: {
          type: 'long',
        },
        revenue: {
          type: 'long',
        },
        genres: {
          type: 'keyword',
          index: true,
        },
        countries: {
          type: 'keyword',
          index: true,
        },
        actors: {
          type: 'keyword',
          index: true,
        },
        directors: {
          type: 'keyword',
          index: true,
        },
      },
    };
    await this.esService.indices.putMapping({
      index: 'movies',
      ...mappings,
    });
  }
}
