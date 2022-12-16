import type { IMovie } from '@common';
import styles from './styles.module.scss';

interface MovieInfoProps {
  movie: IMovie;
}

const MovieInfo = ({ movie }: MovieInfoProps) => (
  <div className={styles.wrapper}>
    <table className={styles.table}>
      <tbody>
        {movie.tagline && (
          <tr>
            <td>Слоган</td>
            <td>{movie.tagline}</td>
          </tr>
        )}
        <tr>
          <td>Рейтинг</td>
          <td>{movie.averageRate}</td>
        </tr>
        <tr>
          <td>Кількість голосів</td>
          <td>{movie.countVotes}</td>
        </tr>
        {movie.budget && (
          <tr>
            <td>Бюджет</td>
            <td>{movie.budget}</td>
          </tr>
        )}
        {movie.revenue && (
          <tr>
            <td>Дохід</td>
            <td>{movie.revenue}</td>
          </tr>
        )}
        {movie.runtime && (
          <tr>
            <td>Тривалість</td>
            <td>{movie.runtime}</td>
          </tr>
        )}
        {movie.releaseDate && (
          <tr>
            <td>Дата виходу</td>
            <td>{movie.releaseDate}</td>
          </tr>
        )}
        <tr>
          <td>Опис</td>
          <td>{movie.description}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export { MovieInfo };
