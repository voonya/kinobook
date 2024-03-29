import { ProtectedRoute } from '@components';
import type { IMoviesFiltes, IMovie } from '@common';
import { getUserRecommendation } from 'src/services';
import { MoviesPage } from '../movies';
import { useState } from 'react';

const Component = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [moviesCount, setMoviesCount] = useState(0);

  const fetchMovies = async (filters: IMoviesFiltes) => {
    getUserRecommendation(filters).then((data) => {
      if (!data.error) {
        setMovies(data.data);
        if (data.count !== moviesCount) setMoviesCount(data.count);
      }
    });
  };

  return (
    <MoviesPage
      movies={movies}
      moviesCount={moviesCount}
      fetchMovies={fetchMovies}
      title={'Recommendations'}
    />
  );
};

export const RecommendationsPage = () => (
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
);
