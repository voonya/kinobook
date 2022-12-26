import type { IActor, IActorForm } from '@common';
import { actorSchema, ENTITY_PER_PAGE } from '@common';
import { Button, Input, Spinner, Table, PaginationBar } from '@components';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  dispatchCreateActor,
  dispatchGetActors,
  dispatchUpdateActor,
  dispatchDeleteActor,
} from 'src/store';
import styles from '../styles.module.scss';
import { ACTOR_COLUMNS } from './table/columns';
import { useAppDispatch, useAppSelector, usePagination } from '@hooks';

const ActorsTabPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IActorForm>({ resolver: joiResolver(actorSchema) });
  const [actorEdit, setActorEdit] = useState<IActor | null>(null);

  const actors = useAppSelector((state) => state.actors);
  const dispatch = useAppDispatch();

  const actorsCount = (actors.data || []).length;
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    setPage,
    page,
    totalPages,
  } = usePagination({ contentPerPage: ENTITY_PER_PAGE, count: actorsCount });

  const paginatedValues = useMemo(
    () => actors.data?.slice(firstContentIndex, lastContentIndex),
    [actors, firstContentIndex, lastContentIndex],
  );

  if (actorsCount <= ENTITY_PER_PAGE && page !== 1) setPage(1);

  useEffect(() => {
    if (!actors.data && !actors.loading) {
      dispatch(dispatchGetActors());
    }
  }, [actors.data, actors.loading, dispatch]);

  const onCreateHandler = (data: any) => {
    if (actorEdit) {
      dispatch(
        dispatchUpdateActor({
          id: actorEdit.id,
          name: data.name,
          surname: data.surname,
        }),
      );

      return;
    }

    dispatch(dispatchCreateActor({ name: data.name, surname: data.surname }));
  };

  const onEdit = (data: IActor) => {
    setActorEdit(data);

    setValue('name', data.name);
    setValue('surname', data.surname);
  };

  const onDeleteHandler = (id: string) => {
    dispatch(dispatchDeleteActor(id));
  };

  const onCancelHandler = () => {
    setActorEdit(null);
    reset();
  };

  return (
    <div>
      <span>
        {actorEdit ? `Edit actor: ${actorEdit.id}` : 'Create new actor:'}
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
        {actorEdit ? (
          <div className={styles.formControls}>
            <Button disabled={actors.loading} type="submit">
              {actors.loading ? <Spinner size="xs" /> : 'Save'}
            </Button>
            <Button disabled={actors.loading} onClick={onCancelHandler}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button type="submit" disabled={actors.loading}>
            {actors.loading ? <Spinner size="xs" /> : 'Create'}
          </Button>
        )}
      </form>
      {actors.loading ? (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      ) : (
        <Table
          disabled={!!actorEdit}
          data={paginatedValues || []}
          columns={ACTOR_COLUMNS}
          onEdit={(data) => onEdit(data as IActor)}
          onDelete={onDeleteHandler}
        />
      )}
      {actorsCount > 0 && (
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

export { ActorsTabPage };
