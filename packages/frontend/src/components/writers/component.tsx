import type { IWriter, IWriterForm } from '@common';
import { writerSchema } from '@common';
import { Button, Input, Spinner, Table } from '@components';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createWriter,
  deleteWriter,
  getAllWriters,
  updateWriter,
} from 'src/services';
import styles from '../styles.module.scss';
import { WRITER_COLUMNS } from './table/columns';

const WritersTabPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IWriterForm>({ resolver: joiResolver(writerSchema) });
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [writers, setWriters] = useState<IWriter[]>([]);
  const [writerEdit, setWriterEdit] = useState<IWriter | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getAllWriters()
      .then((data) => {
        if (!data.error) {
          setWriters(data.writers);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onCreateHandler = (data: any) => {
    setFormError('');
    setIsLoading(true);

    let request;
    if (writerEdit) {
      request = updateWriter(writerEdit.id, data.name, data.surname);
    } else {
      request = createWriter(data.name, data.surname);
    }

    request
      .then((res) => {
        if (res.error && res.statusCode === 400) {
          setFormError(res.error[0]);

          return;
        }

        return getAllWriters();
      })
      .then((data) => {
        if (!data.error) {
          setWriters(data.writers);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onEdit = (data: IWriter) => {
    setWriterEdit(data);

    setValue('name', data.name);
    setValue('surname', data.surname);
  };

  const onDeleteHandler = (id: string) => {
    setIsLoading(true);
    deleteWriter(id)
      .then((res) => {
        if (res.error) {
          return;
        }

        return getAllWriters();
      })
      .then((data) => {
        if (!data.error) {
          setWriters(data.writers);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onCancelHandler = () => {
    setWriterEdit(null);
    setFormError('');
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
          labelRequiredMark
          {...register('surname')}
          error={errors.surname?.message || formError}
        />
        {writerEdit ? (
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
          disabled={!!writerEdit}
          data={writers}
          columns={WRITER_COLUMNS}
          onEdit={(data) => onEdit(data as IWriter)}
          onDelete={onDeleteHandler}
        />
      )}
    </div>
  );
};

export { WritersTabPage };
