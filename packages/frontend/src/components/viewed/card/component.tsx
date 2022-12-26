import type { IViewed } from '@common';
import { SPARoutes } from '@common';
import { MoviePoster, StarRate, Icon, IconName } from '@components';
import { IconButton, BookmarkButton } from '@components';
import { useInBookmarks } from '@hooks';
import { useAppDispatch } from '@hooks';
import { openViewModal, dispatchDeleteViewed } from 'src/store';
import { dispatchCreateBookmark, dispatchDeleteBookmark } from 'src/store';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

interface ViewedCardProps {
  viewed: IViewed;
}

export const ViewedCard = ({ viewed }: ViewedCardProps) => {
  const inBookmarks = useInBookmarks(viewed.movie.id);
  const releaseYear = viewed.movie.releaseDate
    ? new Date(viewed.movie.releaseDate).getFullYear()
    : 'No release';

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const onEdit = () => {
    dispatch(openViewModal({ movieId: viewed.movie.id, viewedId: viewed.id }));
  };

  const onDelete = () => {
    dispatch(dispatchDeleteViewed(viewed.movie.id));
  };

  const onBookmarkToggle = () => {
    const cb = inBookmarks ? dispatchDeleteBookmark : dispatchCreateBookmark;
    dispatch(cb(viewed.movie.id));
  };

  const redirectToMovie = () => {
    navigate(SPARoutes.MOVIE.replace(':id', viewed.movie.id));
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.poster}>
          <MoviePoster poster={viewed.movie.poster} onClick={redirectToMovie} />
          <BookmarkButton
            size="sm"
            added={inBookmarks}
            onClick={onBookmarkToggle}
          />
        </div>
        <div className={styles.controls}>
          <IconButton
            icon={IconName.XMARK}
            onClick={onDelete}
            color={'danger'}
          />
          <IconButton
            icon={IconName.PENCIL}
            onClick={onEdit}
            color={'success'}
          />
        </div>
      </div>

      <div className={styles.innerWrapper}>
        <div className={styles.title}>
          <h4>{viewed.movie.title}</h4>
          <StarRate value={viewed.rate} />
        </div>
        <div className={styles.releaseDate}>
          <span>{releaseYear}</span>{' '}
          <Icon name={viewed.private ? IconName.LOCK : IconName.LOCK_OPEN} />{' '}
        </div>

        <div className={styles.description}>
          {viewed.description ? viewed.description : 'No description'}
        </div>
      </div>
    </div>
  );
};
