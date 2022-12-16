import defaultPoster from '@assets/images/default-poster.jpg';
import { ApiRoutes, FileRoutes } from '@common';
import { getApiRoute } from 'src/helpers';
import styles from './styles.module.scss';

interface MoviePosterProps {
  poster?: string;
  isBuffer?: boolean;
  size?: 'xs' | 'md' | 'lg';
}

const MoviePoster = ({ poster, isBuffer, size = 'md' }: MoviePosterProps) => {
  const posterSrc =
    poster && !isBuffer
      ? getApiRoute(ApiRoutes.FILE, FileRoutes.GET_BY_ID).replace(':id', poster)
      : poster;

  return (
    <div className={`${styles.wrapper}`} data-size={size}>
      <img src={posterSrc || defaultPoster} alt="movie poster" />
    </div>
  );
};

export { MoviePoster };
