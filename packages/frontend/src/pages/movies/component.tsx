import type { IMovie, IMoviesFiltes } from '@common';
import { ENTITY_PER_PAGE } from '@common';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, memo, useCallback } from 'react';
import {
  Layout,
  Container,
  Input,
  MovieFilter,
  Spinner,
  Button,
  MovieMatrix,
  PaginationBar,
} from '@components';
import { usePagination } from '@hooks';
import styles from './styles.module.scss';

interface MoviesPageProps {
  title: string;
  movies: IMovie[];
  moviesCount?: number;
  fetchMovies: (filters: IMoviesFiltes) => Promise<void>;
  loading?: boolean;
}

const MoviesPage = memo(
  ({
    title,
    movies,
    fetchMovies,
    loading = false,
    moviesCount = 0,
  }: MoviesPageProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const titleParam = searchParams.get('title');
    const [titleValue, setTitleValue] = useState(titleParam ?? '');
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<IMoviesFiltes>({});

    const { nextPage, prevPage, setPage, page, totalPages } = usePagination({
      contentPerPage: ENTITY_PER_PAGE,
      count: moviesCount,
    });

    const getMovies = useCallback(() => {
      if (!titleValue && titleParam) {
        setSearchParams({});
      }

      if (titleValue) {
        setSearchParams({ title: titleValue });
      }
      setIsLoading(true);
      fetchMovies({
        ...filters,
        title: titleValue || undefined,
        offset: ((page || 1) - 1) * ENTITY_PER_PAGE,
        limit: ENTITY_PER_PAGE,
      }).finally(() => setIsLoading(false));
    }, [fetchMovies, filters, page, setSearchParams, titleParam, titleValue]);

    useEffect(() => {
      if (!loading) getMovies();
    }, [filters, page, loading]);

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
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.inputWrapper}>
              <Input
                onChange={onTitleInputChange}
                value={titleValue}
                errorBlock={false}
              />
              <Button onClick={getMovies}>Search</Button>
            </div>
            <div className={styles.innerWrapper}>
              {isLoading ? (
                <div className={styles.spinnerWraper}>
                  <Spinner />
                </div>
              ) : (
                <MovieMatrix movies={movies} />
              )}
              <MovieFilter onFiltersApply={onFiltersApply} />
            </div>
            {moviesCount > 0 && (
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
  },
);

export { MoviesPage };
