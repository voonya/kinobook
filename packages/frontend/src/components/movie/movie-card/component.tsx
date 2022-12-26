import { MoviePoster } from '../poster';
import { BookmarkButton } from '../buttons';
import type { IMovie } from '@common';
import styles from './styles.module.scss';
import { SPARoutes } from '@common';
import { useInBookmarks } from '@hooks';
import { useAppDispatch, useAppSelector } from '@hooks';
import { dispatchCreateBookmark, dispatchDeleteBookmark } from 'src/store';
import { useNavigate } from 'react-router-dom';
import { GenreTag } from '@components';

interface MovieCardProps {
  movie: IMovie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const bookMarksAdded = useInBookmarks(movie.id);

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const onBookmarkToggle = () => {
    const cb = bookMarksAdded ? dispatchDeleteBookmark : dispatchCreateBookmark;
    dispatch(cb(movie.id));
  };

  const redirectToMovie = () => {
    navigate(SPARoutes.MOVIE.replace(':id', movie.id));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.poster}>
        <MoviePoster poster={movie.poster} onClick={redirectToMovie} />
        {user && (
          <BookmarkButton
            added={bookMarksAdded}
            size={'md'}
            onClick={onBookmarkToggle}
          />
        )}
      </div>
      <div className={styles.body}>
        <h4>{movie.title}</h4>
        {movie.releaseDate && (
          <span>{new Date(movie.releaseDate).getFullYear()}</span>
        )}
        <div className={styles.genres}>
          {movie.genres.map((genre) => (
            <GenreTag key={genre.id} genre={genre} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { MovieCard };
