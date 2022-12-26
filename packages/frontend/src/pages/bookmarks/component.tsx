import type { IMovie, IMoviesFiltes } from '@common';
import { useState } from 'react';
import { getMoviesInBookmarks } from 'src/services';
import { useAppSelector } from '@hooks';
import { ProtectedRoute } from '@components';

import { MoviesPage } from '../movies';

const Component = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [moviesCount, setMoviesCount] = useState(0);
  const loading = useAppSelector((state) => state.bookmarks.loading);

  const fetchMovies = async (filters: IMoviesFiltes) => {
    getMoviesInBookmarks(filters).then((data) => {
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
      title={'Bookmarks'}
      loading={loading}
    />
  );
};

export const BookmarkPage = () => (
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
);
