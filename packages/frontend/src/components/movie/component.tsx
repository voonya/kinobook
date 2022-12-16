import type { IMovie } from '@common';
import { Container } from '@components';
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
  const filmViewed = false;
  const bookmarksAdded = true;

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
          <div className={styles.controls}>
            <BookmarkButton added={bookmarksAdded} />
            <ViewedButton viewed={filmViewed} />
          </div>
        </div>
        <div className={styles.info}>
          <MovieTitle title={movie.title} />
          <MovieInfo movie={movie} />
        </div>
      </div>
      {movie.trailer && <YouTubePlayer link={movie.trailer} />}
    </Container>
  );
};

export { Movie };
