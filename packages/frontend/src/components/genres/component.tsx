import type { IGenre, IGenreForm } from '@common';
import { genreSchema } from '@common';
import { Button, Input, Spinner, Table } from '@components';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createGenre,
  deleteGenre,
  getAllGenres,
  updateGenre,
} from 'src/services';
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
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [genreEdit, setGenreEdit] = useState<IGenre | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getAllGenres()
      .then((data) => {
        if (!data.error) {
          setGenres(data.genres);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onCreateHandler = (data: any) => {
    setFormError('');
    setIsLoading(true);

    let request;
    if (genreEdit) {
      request = updateGenre(genreEdit.id, data.name);
    } else {
      request = createGenre(data.name);
    }

    request
      .then((res) => {
        if (res.error && res.statusCode === 400) {
          setFormError(res.error[0]);

          return;
        }

        return getAllGenres();
      })
      .then((data) => {
        if (!data.error) {
          setGenres(data.genres);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onEdit = (data: IGenre) => {
    setGenreEdit(data);

    setValue('name', data.name);
  };

  const onDeleteHandler = (id: string) => {
    setIsLoading(true);
    deleteGenre(id)
      .then((res) => {
        if (res.error) {
          return;
        }

        return getAllGenres();
      })
      .then((data) => {
        if (!data.error) {
          setGenres(data.genres);
        }
      })
      .finally(() => setIsLoading(false));
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
          disabled={!!genreEdit}
          data={genres}
          columns={GENRE_COLUMNS}
          onEdit={(data) => onEdit(data as IGenre)}
          onDelete={onDeleteHandler}
        />
      )}
    </div>
  );
};

export { GenresTabPage };
