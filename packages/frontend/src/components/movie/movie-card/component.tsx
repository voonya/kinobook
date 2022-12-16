import { useState } from 'react';
import { MoviePoster } from '../poster';
import { BookmarkButton } from '../buttons';
import { StringCutter } from '@components';
import type { IMovie } from '@common';
import styles from './styles.module.scss';

interface MovieCardProps {
  movie: IMovie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [bookmarksAdded, setBookmarksAdded] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div onClick={() => console.log('click')} className={styles.poster}>
        <MoviePoster poster={movie.poster} />
        <BookmarkButton
          added={bookmarksAdded}
          size={'sm'}
          onClick={() => setBookmarksAdded(!bookmarksAdded)}
        />
      </div>
      <div>
        <h4>{movie.title}</h4>
        <StringCutter lines={3}>{movie.description}</StringCutter>
      </div>
    </div>
  );
};

export { MovieCard };
