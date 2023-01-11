import {
  Layout,
  Container,
  ViewedCard,
  Spinner,
  Input,
  Button,
  PaginationBar,
  MovieFilter,
  ProtectedRoute,
} from '@components';
import { getUserViews } from 'src/services';
import type { IViewed, IMoviesFiltes } from '@common';
import { ENTITY_PER_PAGE } from '@common';
import { useEffect, useState, useCallback } from 'react';
import { useAppSelector, usePagination } from '@hooks';

import styles from './styles.module.scss';

const Component = () => {
  const [views, setViews] = useState<IViewed[]>([]);
  const viewed = useAppSelector((state) => state.viewed);
  const [isLoading, setIsLoading] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  const [filters, setFilters] = useState<IMoviesFiltes>({});
  const [viewsCount, setViewsCount] = useState(0);

  const { nextPage, prevPage, setPage, page, totalPages } = usePagination({
    contentPerPage: ENTITY_PER_PAGE,
    count: viewsCount,
  });

  const fetchViews = useCallback(async () => {
    setIsLoading(true);
    getUserViews({
      ...filters,
      title: titleValue || undefined,
      offset: ((page || 1) - 1) * ENTITY_PER_PAGE,
      limit: ENTITY_PER_PAGE,
    })
      .then((data) => {
        if (!data.error) {
          setViews(data.data);
          viewsCount !== data.count && setViewsCount(data.count);
        }
      })
      .finally(() => setIsLoading(false));
  }, [filters, page, titleValue]);

  useEffect(() => {
    if (!viewed.loading && !isLoading) fetchViews();
  }, [page, filters, viewed.loading, fetchViews]);

  const onTitleInputChange = (e: any) => {
    setTitleValue(e.target.value);
  };

  const onFiltersApply = (data: IMoviesFiltes) => {
    setPage(1);
    setFilters({ ...data });
  };

  return (
    <Layout>
      <Container style={{ width: '100%', flex: 1, display: 'flex' }}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Viewed</h2>
          <div className={styles.inputWrapper}>
            <Input onChange={onTitleInputChange} />
            <Button onClick={fetchViews}>Search</Button>
          </div>
          <div className={styles.innerWrapper}>
            <div className={styles.cardWrapper}>
              {isLoading ? (
                <Spinner />
              ) : (
                views.map((el) => <ViewedCard key={el.id} viewed={el} />)
              )}
            </div>
            {!views.length && !isLoading && (
              <div className={styles.placeholder}>No movies</div>
            )}
            <MovieFilter onFiltersApply={onFiltersApply} />
          </div>
          {viewsCount > 0 && (
            <PaginationBar
              firstPage={1}
              page={page}
              lastPage={totalPages}
              onPrevPage={prevPage}
              onNextPage={nextPage}
            />
          )}
        </div>
      </Container>
    </Layout>
  );
};

export const ViewedPage = () => (
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
);
