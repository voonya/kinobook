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
  const posterSrc =
    poster && !isBuffer
      ? getApiRoute(ApiRoutes.FILE, FileRoutes.GET_BY_ID).replace(':id', poster)
      : poster;

  return (
    <div className={`${styles.wrapper}`} data-size={size} onClick={onClick}>
      <img src={posterSrc || defaultPoster} alt="movie poster" />
    </div>
  );
};

export { MoviePoster };
