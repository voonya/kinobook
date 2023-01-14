import { useNavigate } from 'react-router-dom';
import { Role, SPARoutes } from '@common';
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
import { SimilarMovies } from './similar';
import { MoviePricing } from './pricing';

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

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: '1',
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
                {user.role === Role.ADMIN && (
                  <IconButton
                    icon={IconName.PENCIL}
                    color="success"
                    size={'lg'}
                    onClick={onEdit}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div className={styles.info}>
          <MovieTitle title={movie.title} tagline={movie.tagline} />
          <MovieInfo movie={movie} />
          <MoviePricing movie={movie} />
        </div>
      </div>
      {movie.trailer && <YouTubePlayer link={movie.trailer} />}
      <SimilarMovies movieId={movie.id} />
      <MovieComments movieId={movie.id} />
    </Container>
  );
};

export { Movie };
