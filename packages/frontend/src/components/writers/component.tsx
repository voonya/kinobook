import type { IWriter, IWriterForm } from '@common';
import { writerSchema, ENTITY_PER_PAGE } from '@common';
import { Button, Input, Spinner, Table, PaginationBar } from '@components';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../styles.module.scss';
import { WRITER_COLUMNS } from './table/columns';
import {
  dispatchCreateWriter,
  dispatchGetWriters,
  dispatchUpdateWriter,
  dispatchDeleteWriter,
} from 'src/store';
import { useAppDispatch, useAppSelector, usePagination } from '@hooks';

const WritersTabPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IWriterForm>({ resolver: joiResolver(writerSchema) });
  const writers = useAppSelector((state) => state.writers);
  const dispatch = useAppDispatch();

  const [writerEdit, setWriterEdit] = useState<IWriter | null>(null);

  const writersCount = (writers.data || []).length;
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    setPage,
    page,
    totalPages,
  } = usePagination({ contentPerPage: ENTITY_PER_PAGE, count: writersCount });

  if (writersCount <= ENTITY_PER_PAGE && page !== 1) setPage(1);

  useEffect(() => {
    if (!writers.data && !writers.loading) {
      dispatch(dispatchGetWriters());
    }
  }, [writers.data, writers.loading, dispatch]);

  const onCreateHandler = (data: any) => {
    if (writerEdit) {
      dispatch(
        dispatchUpdateWriter({
          id: writerEdit.id,
          name: data.name,
          surname: data.surname,
        }),
      );

      return;
    }

    dispatch(dispatchCreateWriter({ name: data.name, surname: data.surname }));
  };

  const onEdit = (data: IWriter) => {
    setWriterEdit(data);

    setValue('name', data.name);
    setValue('surname', data.surname);
  };

  const onDeleteHandler = (id: string) => {
    dispatch(dispatchDeleteWriter(id));
  };

  const onCancelHandler = () => {
    setWriterEdit(null);
    reset();
  };

  return (
    <div>
      <span>
        {writerEdit ? `Edit writer: ${writerEdit.id}` : 'Create new writer:'}
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
        {writerEdit ? (
          <div className={styles.formControls}>
            <Button disabled={writers.loading} type="submit">
              {writers.loading ? <Spinner size="xs" /> : 'Save'}
            </Button>
            <Button disabled={writers.loading} onClick={onCancelHandler}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button type="submit" disabled={writers.loading}>
            {writers.loading ? <Spinner size="xs" /> : 'Create'}
          </Button>
        )}
      </form>
      {writers.loading ? (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      ) : (
        <Table
          disabled={!!writerEdit}
          data={writers.data || []}
          columns={WRITER_COLUMNS}
          onEdit={(data) => onEdit(data as IWriter)}
          onDelete={onDeleteHandler}
        />
      )}
      {writersCount > 0 && (
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

export { WritersTabPage };
