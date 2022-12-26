import type { IMovie } from '@common';
import { MovieCard } from '@components';
import styles from './styles.module.scss';

interface MovieMatrixProps {
  movies: IMovie[];
}

const MovieMatrix = ({ movies }: MovieMatrixProps) =>
  !movies.length ? (
    <div className={styles.plug}>No movies</div>
  ) : (
    <div className={styles.wrapper}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );

export { MovieMatrix };
