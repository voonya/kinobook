import { Layout, MovieForm, Container, Spinner } from '@components';
import type { IMovie } from '@common';
import { useParams, useNavigate } from 'react-router-dom';
import { useTitle } from '@hooks';
import { SPARoutes } from '@common';
import { getMovie, updateMovie } from 'src/services';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

const MovieUpdatePage = () => {
  useTitle(SPARoutes.UPDATE_MOVIE);
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate(SPARoutes.NOT_FOUND);
  }

  const [movie, setMovie] = useState<IMovie | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMovie(id!)
      .then((data) => {
        if (data.error) {
          navigate(SPARoutes.NOT_FOUND);
        }
        setMovie(data);
        console.log(data);
      })
      .finally(() => setIsLoading(false));
  }, [id, navigate]);

  const onFormSubmit = (data: FormData) =>
    updateMovie(id as string, data).then((data) => {
      if (!data.error) {
        navigate(SPARoutes.MOVIE.replace(':id', data.id));
      }
    });

  return (
    <Layout>
      <Container>
        {isLoading && !movie ? (
          <Spinner size="lg" />
        ) : (
          <>
            <h1 className={styles.title}>Редагувати фільм:</h1>
            <MovieForm movie={movie!} onFormSubmit={onFormSubmit} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export { MovieUpdatePage };
