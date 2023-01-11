import type { IMovie } from '@common';
import { EntityTag } from '@components';
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
    {movie.releaseDate && (
      <>
        <div>Release date</div>
        <div>{new Date(movie.releaseDate).toLocaleDateString()}</div>
      </>
    )}
    {movie?.genres.length > 0 && (
      <>
        <div className={styles.entityTitle}>Genres</div>
        <div className={styles.entities}>
          {movie.genres.map((el) => (
            <EntityTag key={el.id} value={el.name} />
          ))}
        </div>
      </>
    )}

    {movie.runtime && (
      <>
        <div>Runtime (min)</div>
        <div>{movie.runtime}</div>
      </>
    )}
    {movie?.directors.length > 0 && (
      <>
        <div className={styles.entityTitle}>Directors</div>
        <div className={styles.entities}>
          {movie.directors.map((el) => (
            <EntityTag
              key={el.id}
              value={`${el.name}` + (el.surname ? ` ${el.surname}` : '')}
            />
          ))}
        </div>
      </>
    )}
    {movie.budget && (
      <>
        <div>Budget ($)</div>
        <div>{movie.budget}</div>
      </>
    )}
    {movie.revenue && (
      <>
        <div>Revenue ($)</div>
        <div>{movie.revenue}</div>
      </>
    )}

    {movie?.countries.length > 0 && (
      <>
        <div className={styles.entityTitle}>Countries</div>
        <div className={styles.entities}>
          {movie.countries.map((el) => (
            <EntityTag key={el.id} value={el.name} />
          ))}
        </div>
      </>
    )}

    {movie?.actors.length > 0 && (
      <>
        <div className={styles.entityTitle}>Actors</div>
        <div className={styles.entities}>
          {movie.actors.map((el) => (
            <EntityTag
              key={el.id}
              value={`${el.name}` + (el.surname ? ` ${el.surname}` : '')}
            />
          ))}
        </div>
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
            <div className={styles.genres}>{movie.genres.map(el => <EntityTag genre={el} />)}</div>
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
