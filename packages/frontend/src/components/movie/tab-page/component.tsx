import type { IMovie } from '@common';
import { SPARoutes } from '@common';
import { Button, Spinner, Table } from '@components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteMovie, getAllMovies } from 'src/services';
import stylesAll from '../../styles.module.scss';
import { MOVIE_COLUMNS } from './columns';
import styles from './styles.module.scss';

const MoviesTabPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        console.log(data);

        if (!data.error) {
          setMovies(data);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onEdit = (data: IMovie) => {
    navigate(SPARoutes.UPDATE_MOVIE.replace(':id', data.id));
  };

  const onDelete = (id: string) => {
    setIsLoading(true);
    deleteMovie(id).finally(() => setIsLoading(false));
  };

  const onCreate = () => {
    navigate(SPARoutes.CREATE_MOVIE);
  };

  return (
    <div className={styles.wrapper}>
      <Button onClick={onCreate}>Create</Button>
      {isLoading ? (
        <div className={stylesAll.spinnerWrapper}>
          <Spinner />
        </div>
      ) : (
        <Table
          columns={MOVIE_COLUMNS}
          data={movies}
          onEdit={(data) => onEdit(data as IMovie)}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export { MoviesTabPage };
