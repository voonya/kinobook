import type { IMovie } from '@common';
import { GenreTag } from '@components';
import styles from './styles.module.scss';

interface MovieInfoProps {
  movie: IMovie;
}

const MovieInfo = ({ movie }: MovieInfoProps) => (
  <div className={styles.wrapper}>
    <>
      <div>Rating</div>
      <div>
        {movie.averageRate
          ? `${movie.averageRate} (${movie.countVotes})`
          : 'No rate'}
      </div>
    </>
    {movie?.genres.length > 0 && (
      <>
        <div className={styles.genresTitle}>Genres</div>
        <div className={styles.genres}>
          {movie.genres.map((el) => (
            <GenreTag key={el.id} genre={el} />
          ))}
        </div>
      </>
    )}
    {movie.tagline && (
      <>
        <div>Tagline</div>
        <div>{movie.tagline}</div>
      </>
    )}

    {movie.budget && (
      <>
        <div>Budget</div>
        <div>{movie.budget}</div>
      </>
    )}
    {movie.revenue && (
      <>
        <div>Revenue</div>
        <div>{movie.revenue}</div>
      </>
    )}
    {movie.runtime && (
      <>
        <div>Runtime</div>
        <div>{movie.runtime}</div>
      </>
    )}
    {movie.releaseDate && (
      <>
        <div>Release date</div>
        <div>{new Date(movie.releaseDate).toLocaleDateString()}</div>
      </>
    )}
    <>
      <div>Description</div>
      <div>{movie.description}</div>
    </>
    {/* <table className={styles.table}>
      <tbody>
        {movie.genres && (
          <>
            <div>Genres</div>
            <div className={styles.genres}>{movie.genres.map(el => <GenreTag genre={el} />)}</div>
          </>
        )}
        {movie.tagline && (
          <>
            <div>Tagline</div>
            <div>{movie.tagline}</div>
          </>
        )}
        {movie.averageRate &&
          <>
            <>
              <div>Rating</div>
              <div>{movie.averageRate}</div>
            </>
            <>
              <div>Count votes</div>
              <div>{movie.countVotes}</div>
            </>
          </>
        }

        {movie.budget && (
          <>
            <div>Budget</div>
            <div>{movie.budget}</div>
          </>
        )}
        {movie.revenue && (
          <>
            <div>Revenue</div>
            <div>{movie.revenue}</div>
          </>
        )}
        {movie.runtime && (
          <>
            <div>Runtime</div>
            <div>{movie.runtime}</div>
          </>
        )}
        {movie.releaseDate && (
          <>
            <div>Release date</div>
            <div>{movie.releaseDate}</div>
          </>
        )}
        <>
          <div>Description</div>
          <div>{movie.description}</div>
        </>
      </tbody>
    </table> */}
  </div>
);

export { MovieInfo };
