import { ProtectedRoute } from '@components';
import type { IMoviesFiltes, IMovie } from '@common';
import { getUserRecommendation } from 'src/services';
import { useAppSelector } from '@hooks';
import { MoviesPage } from '../movies';
import { useState } from 'react';

const Component = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [moviesCount, setMoviesCount] = useState(0);
  const loading = useAppSelector((state) => state.bookmarks.loading);

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
      loading={loading}
    />
  );
};

export const RecommendationsPage = () => (
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
);
