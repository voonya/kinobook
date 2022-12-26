import type { IMovie, IMoviesFiltes } from '@common';
import { useState } from 'react';
import { getAllMovies } from 'src/services';
import { MoviesPage } from '../movies';

const CataloguePage = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [moviesCount, setMoviesCount] = useState(0);

  const fetchMovies = async (filters: IMoviesFiltes) => {
    getAllMovies(filters).then((data) => {
      if (!data.error) {
        setMovies(data.data);
        if (data.count !== moviesCount) setMoviesCount(data.count);
      }
    });
  };

  return (
    <MoviesPage
      moviesCount={moviesCount}
      movies={movies}
      fetchMovies={fetchMovies}
      title={'Catalogue'}
    />
  );
};

export { CataloguePage };
