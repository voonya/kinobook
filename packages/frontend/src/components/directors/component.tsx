import type { IDirector, IDirectorForm } from '@common';
import { directorSchema, ENTITY_PER_PAGE } from '@common';
import { Button, Input, Spinner, Table, PaginationBar } from '@components';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../styles.module.scss';
import { DIRECTOR_COLUMNS } from './table/columns';
import {
  dispatchCreateDirector,
  dispatchGetDirectors,
  dispatchUpdateDirector,
  dispatchDeleteDirector,
} from 'src/store';
import { useAppDispatch, useAppSelector, usePagination } from '@hooks';

const DirectorsTabPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IDirectorForm>({ resolver: joiResolver(directorSchema) });
  const directors = useAppSelector((state) => state.directors);
  const dispatch = useAppDispatch();

  const [directorEdit, setDirectorEdit] = useState<IDirector | null>(null);

  const directorsCount = (directors.data || []).length;
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    setPage,
    page,
    totalPages,
  } = usePagination({ contentPerPage: ENTITY_PER_PAGE, count: directorsCount });

  const paginatedValues = useMemo(
    () => directors.data?.slice(firstContentIndex, lastContentIndex),
    [directors, firstContentIndex, lastContentIndex],
  );

  if (directorsCount <= ENTITY_PER_PAGE && page !== 1) setPage(1);

  useEffect(() => {
    if (!directors.data && !directors.loading) {
      dispatch(dispatchGetDirectors());
    }
  }, [directors.data, directors.loading, dispatch]);

  const onCreateHandler = (data: any) => {
    if (directorEdit) {
      dispatch(
        dispatchUpdateDirector({
          id: directorEdit.id,
          name: data.name,
          surname: data.surname,
        }),
      );

      return;
    }

    dispatch(
      dispatchCreateDirector({ name: data.name, surname: data.surname }),
    );
  };

  const onEdit = (data: IDirector) => {
    setDirectorEdit(data);

    setValue('name', data.name);
    setValue('surname', data.surname);
  };

  const onDeleteHandler = (id: string) => {
    dispatch(dispatchDeleteDirector(id));
  };

  const onCancelHandler = () => {
    setDirectorEdit(null);
    reset();
  };

  return (
    <div>
      <span>
        {directorEdit
          ? `Edit director: ${directorEdit.id}`
          : 'Create new director:'}
      </span>
      <form onSubmit={handleSubmit(onCreateHandler)}>
        <Input
          label="Name"
          labelRequiredMark
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Surname"
          {...register('surname')}
          error={errors.surname?.message}
        />
        {directorEdit ? (
          <div className={styles.formControls}>
            <Button disabled={directors.loading} type="submit">
              {directors.loading ? <Spinner size="xs" /> : 'Save'}
            </Button>
            <Button disabled={directors.loading} onClick={onCancelHandler}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button type="submit" disabled={directors.loading}>
            {directors.loading ? <Spinner size="xs" /> : 'Create'}
          </Button>
        )}
      </form>
      {directors.loading ? (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      ) : (
        <Table
          disabled={!!directorEdit}
          data={paginatedValues || []}
          columns={DIRECTOR_COLUMNS}
          onEdit={(data) => onEdit(data as IDirector)}
          onDelete={onDeleteHandler}
        />
      )}
      {directorsCount > 0 && (
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

export { DirectorsTabPage };
