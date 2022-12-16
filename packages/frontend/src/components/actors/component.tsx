import type { IActor, IActorForm } from '@common';
import { actorSchema } from '@common';
import { Button, Input, Spinner, Table } from '@components';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createActor,
  deleteActor,
  getAllActors,
  updateActor,
} from 'src/services';
import styles from '../styles.module.scss';
import { ACTOR_COLUMNS } from './table/columns';

const ActorsTabPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IActorForm>({ resolver: joiResolver(actorSchema) });
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [actors, setActors] = useState<IActor[]>([]);
  const [actorEdit, setActorEdit] = useState<IActor | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getAllActors()
      .then((data) => {
        if (!data.error) {
          setActors(data.actors);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onCreateHandler = (data: any) => {
    setFormError('');
    setIsLoading(true);

    let request;
    if (actorEdit) {
      request = updateActor(actorEdit.id, data.name, data.surname);
    } else {
      request = createActor(data.name, data.surname);
    }

    request
      .then((res) => {
        if (res.error && res.statusCode === 400) {
          setFormError(res.error[0]);

          return;
        }

        return getAllActors();
      })
      .then((data) => {
        if (!data.error) {
          setActors(data.actors);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onEdit = (data: IActor) => {
    setActorEdit(data);

    setValue('name', data.name);
    setValue('surname', data.surname);
  };

  const onDeleteHandler = (id: string) => {
    setIsLoading(true);
    deleteActor(id)
      .then((res) => {
        if (res.error) {
          return;
        }

        return getAllActors();
      })
      .then((data) => {
        if (!data.error) {
          setActors(data.actors);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onCancelHandler = () => {
    setActorEdit(null);
    setFormError('');
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
          labelRequiredMark
          {...register('surname')}
          error={errors.surname?.message || formError}
        />
        {actorEdit ? (
          <div className={styles.formControls}>
            <Button disabled={isLoading} type="submit">
              {isLoading ? <Spinner size="xs" /> : 'Save'}
            </Button>
            <Button disabled={isLoading} onClick={onCancelHandler}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size="xs" /> : 'Create'}
          </Button>
        )}
      </form>
      {isLoading ? (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      ) : (
        <Table
          disabled={!!actorEdit}
          data={actors}
          columns={ACTOR_COLUMNS}
          onEdit={(data) => onEdit(data as IActor)}
          onDelete={onDeleteHandler}
        />
      )}
    </div>
  );
};

export { ActorsTabPage };
