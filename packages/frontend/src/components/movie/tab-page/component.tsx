import type { IMovie } from '@common';
import { SPARoutes } from '@common';
import { Button, Spinner, Table, PaginationBar, Input } from '@components';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteMovie, getAllMovies } from 'src/services';
import stylesAll from '../../styles.module.scss';
import { MOVIE_COLUMNS } from './columns';
import { usePagination } from '@hooks';
import { ENTITY_PER_PAGE } from '@common';
import styles from './styles.module.scss';

const MoviesTabPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [moviesCount, setMoviesCount] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  const { nextPage, prevPage, setPage, page, totalPages } = usePagination({
    contentPerPage: ENTITY_PER_PAGE,
    count: moviesCount,
  });
  const navigate = useNavigate();

  const fetchMovies = () => {
    getAllMovies({
      title: titleValue,
      offset: (page - 1) * 10,
      limit: ENTITY_PER_PAGE,
    })
      .then((data) => {
        if (!data.error) {
          setMovies(data.data);
          setMoviesCount(data.count);
          if (data.count && page === 0) setPage(1);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(fetchMovies, [page, titleValue, setPage]);

  const onEdit = (data: IMovie) => {
    navigate(SPARoutes.UPDATE_MOVIE.replace(':id', data.id));
  };

  const onDelete = (id: string) => {
    setIsLoading(true);
    deleteMovie(id)
      .then((data) => {
        if (!data.error) {
          return fetchMovies();
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onCreate = () => {
    navigate(SPARoutes.CREATE_MOVIE);
  };

  const onSearch = () => {
    setTitleValue(titleRef.current?.value || '');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <Input label="Title" ref={titleRef} />
        <Button onClick={onSearch}>Search</Button>
      </div>
      <Button onClick={onCreate}>Create</Button>
      {isLoading ? (
        <div className={stylesAll.spinnerWrapper}>
          <Spinner />
        </div>
      ) : (
        <>
          <Table
            columns={MOVIE_COLUMNS}
            data={movies}
            onEdit={(data) => onEdit(data as IMovie)}
            onDelete={onDelete}
          />
          {moviesCount > 0 && (
            <PaginationBar
              firstPage={1}
              page={page}
              lastPage={totalPages}
              onPrevPage={prevPage}
              onNextPage={nextPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export { MoviesTabPage };
