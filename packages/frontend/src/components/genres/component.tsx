import type { IGenre, IGenreForm } from '@common';
import { genreSchema, ENTITY_PER_PAGE } from '@common';
import { Button, Input, Spinner, Table, PaginationBar } from '@components';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector, usePagination } from '@hooks';
import {
  dispatchGetGenres,
  dispatchCreateGenre,
  dispatchUpdateGenre,
  dispatchDeleteGenre,
} from 'src/store';
import { GENRE_COLUMNS } from './table/columns';
import styles from '../styles.module.scss';

const GenresTabPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IGenreForm>({ resolver: joiResolver(genreSchema) });
  const [formError, setFormError] = useState('');
  const genres = useAppSelector((state) => state.genres);
  const dispatch = useAppDispatch();
  const [genreEdit, setGenreEdit] = useState<IGenre | null>(null);

  const genresCount = (genres.data || []).length;
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    setPage,
    page,
    totalPages,
  } = usePagination({ contentPerPage: ENTITY_PER_PAGE, count: genresCount });

  const paginatedValues = useMemo(
    () => genres.data?.slice(firstContentIndex, lastContentIndex),
    [genres, firstContentIndex, lastContentIndex],
  );

  if (genresCount <= ENTITY_PER_PAGE && page !== 1) setPage(1);

  useEffect(() => {
    if (!genres.data && !genres.loading) {
      dispatch(dispatchGetGenres());
    }
  }, [genres, dispatch]);

  const onCreateHandler = (data: any) => {
    setFormError('');

    if (genreEdit) {
      dispatch(dispatchUpdateGenre({ id: genreEdit.id, name: data.name }));

      return;
    }

    dispatch(dispatchCreateGenre(data.name));
  };

  const onEdit = (data: IGenre) => {
    setGenreEdit(data);

    setValue('name', data.name);
  };

  const onDeleteHandler = (id: string) => {
    dispatch(dispatchDeleteGenre(id));
  };

  const onCancelHandler = () => {
    setGenreEdit(null);
    setFormError('');
    reset();
  };

  return (
    <div>
      <span>
        {genreEdit ? `Edit genre: ${genreEdit.id}` : 'Create new genre:'}
      </span>
      <form onSubmit={handleSubmit(onCreateHandler)}>
        <Input
          label="Name"
          labelRequiredMark
          {...register('name')}
          error={errors.name?.message || formError}
        />
        {genreEdit ? (
          <div className={styles.formControls}>
            <Button disabled={genres.loading} type="submit">
              {genres.loading ? <Spinner size="xs" /> : 'Save'}
            </Button>
            <Button disabled={genres.loading} onClick={onCancelHandler}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button type="submit" disabled={genres.loading}>
            {genres.loading ? <Spinner size="xs" /> : 'Create'}
          </Button>
        )}
      </form>
      {genres.loading ? (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      ) : (
        <Table
          disabled={!!genreEdit}
          data={paginatedValues || []}
          columns={GENRE_COLUMNS}
          onEdit={(data) => onEdit(data as IGenre)}
          onDelete={onDeleteHandler}
        />
      )}
      {genresCount > 0 && (
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

export { GenresTabPage };
