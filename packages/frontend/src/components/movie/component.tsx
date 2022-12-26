import { useNavigate } from 'react-router-dom';
import { SPARoutes } from '@common';
import type { IMovie } from '@common';
import { Container, IconButton, MovieComments, IconName } from '@components';
import {
  useInBookmarks,
  useInViewed,
  useAppDispatch,
  useAppSelector,
} from '@hooks';
import {
  dispatchCreateBookmark,
  dispatchDeleteBookmark,
  openViewModal,
} from 'src/store';
import { BookmarkButton, ViewedButton } from './buttons';
import { MovieInfo } from './info';
import { MoviePoster } from './poster';
import styles from './styles.module.scss';
import { MovieTitle } from './title';
import { YouTubePlayer } from './yt-player';

interface MovieProps {
  movie: IMovie;
}

const Movie = ({ movie }: MovieProps) => {
  const inBookmarks = useInBookmarks(movie.id);
  const inViewed = useInViewed(movie.id);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const onBookmarkToggle = () => {
    const cb = inBookmarks ? dispatchDeleteBookmark : dispatchCreateBookmark;
    dispatch(cb(movie.id));
  };

  const inViewedClick = () => {
    if (!inViewed) {
      dispatch(openViewModal({ movieId: movie.id }));

      return;
    }
  };

  const onEdit = () => {
    navigate(SPARoutes.UPDATE_MOVIE.replace(':id', movie.id));
  };

  // const onDelete = () => {
  //   setIsLoading(true);
  //   deleteMovie(id).then((data) => {
  //     if (!data.error) {
  //       return fetchMovies();
  //     }
  //   }).finally(() => setIsLoading(false));
  // }

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className={styles.infoWrapper}>
        <div className={styles.posterWrapper}>
          <MoviePoster poster={movie.poster} size="lg" />
          {user && (
            <>
              <div className={styles.controls}>
                <BookmarkButton
                  added={inBookmarks}
                  onClick={onBookmarkToggle}
                />
                <ViewedButton viewed={inViewed} onClick={inViewedClick} />
                <IconButton
                  icon={IconName.PENCIL}
                  color="success"
                  size={'lg'}
                  onClick={onEdit}
                />
              </div>
            </>
          )}
        </div>
        <div className={styles.info}>
          <MovieTitle title={movie.title} />
          <MovieInfo movie={movie} />
        </div>
      </div>
      {movie.trailer && <YouTubePlayer link={movie.trailer} />}
      <h4 className={styles.comments}>Comments</h4>
      <MovieComments movieId={movie.id} />
    </Container>
  );
};

export { Movie };
