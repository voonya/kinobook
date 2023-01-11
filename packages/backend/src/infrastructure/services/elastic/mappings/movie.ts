export const movieMapping = {
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
    averageRate: {
      type: 'float',
    },
    countVotes: {
      type: 'long',
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
