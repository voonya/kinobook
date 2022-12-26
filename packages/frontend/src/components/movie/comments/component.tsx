import { Comment } from './comment';
import { getMovieViews } from 'src/services';
import { useState, useEffect } from 'react';
import { usePagination } from '@hooks';
import { ENTITY_PER_PAGE } from '@common';
import { PaginationBar } from '@components';
import styles from './styles.module.scss';
import type { IViewed } from '@common';

interface IMovieCommentsProps {
  movieId: string;
}

export const MovieComments = ({ movieId }: IMovieCommentsProps) => {
  const [comments, setComments] = useState<IViewed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentsCount, setCommentsCount] = useState(0);
  const { nextPage, prevPage, setPage, page, totalPages } = usePagination({
    contentPerPage: ENTITY_PER_PAGE,
    count: commentsCount,
  });
  useEffect(() => {
    getMovieViews(movieId, {
      offset: (page - 1) * ENTITY_PER_PAGE,
      limit: ENTITY_PER_PAGE,
    })
      .then((data) => {
        if (!data.error) {
          setComments(data.data);
          if (commentsCount !== data.count) setCommentsCount(data.count);
        }
      })
      .finally(() => setIsLoading(false));
  }, [movieId, commentsCount, page]);

  const renderComments = () => {
    if (!comments.length) {
      return <div>No comments</div>;
    }

    return (
      <div>
        {comments.map((el) => (
          <Comment viewed={el} key={el.id} />
        ))}
        {commentsCount > 0 && (
          <PaginationBar
            firstPage={1}
            page={page}
            lastPage={totalPages}
            onPrevPage={prevPage}
            onNextPage={nextPage}
          />
        )}
      </div>
    );
  };

  return <div className={styles.wrapper}>{!isLoading && renderComments()}</div>;
};
