import { Spinner, MovieCard } from '@components';
import { getSimilarMovies } from 'src/services';
import { useState, useEffect } from 'react';
import type { IMovie } from '@common';

import styles from './styles.module.scss';

interface ISimilarMoviesProps {
  movieId: string;
}

const SimilarMovies = ({ movieId }: ISimilarMoviesProps) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getSimilarMovies(movieId, 5)
      .then((res) => {
        if (!res.error) {
          setMovies(res);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.wrapper}>
      <h3>Similar movies</h3>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.recommendations}>
          {movies.map((movie) => (
            <MovieCard key={movie.id + Math.random()} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export { SimilarMovies };
