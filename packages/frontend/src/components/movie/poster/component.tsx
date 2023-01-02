import defaultPoster from '@assets/images/movie-placeholder.png';
import { ApiRoutes, FileRoutes } from '@common';
import { getApiRoute } from 'src/helpers';
import styles from './styles.module.scss';

interface MoviePosterProps {
  poster?: string | null;
  isBuffer?: boolean;
  size?: 'xs' | 'md' | 'lg';
  onClick?: () => void;
}

const MoviePoster = ({
  poster,
  isBuffer,
  size = 'md',
  onClick,
}: MoviePosterProps) => {
  const getHttpRoute = (poster: string) => {
    if (poster.startsWith('foreign:tmdb:')) {
      return `https://image.tmdb.org/t/p/w200/${poster.replace(
        'foreign:tmdb:',
        '',
      )}`;
    }

    return getApiRoute(ApiRoutes.FILE, FileRoutes.GET_BY_ID).replace(
      ':id',
      poster,
    );
  };

  const posterSrc = poster && !isBuffer ? getHttpRoute(poster) : poster;

  return (
    <div className={`${styles.wrapper}`} data-size={size} onClick={onClick}>
      <img
        src={posterSrc || defaultPoster}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = defaultPoster;
        }}
        alt="movie poster"
      />
    </div>
  );
};

export { MoviePoster };
