import { SPARoutes } from '@common';
import { Container, Layout, MovieForm } from '@components';
import { useNavigate } from 'react-router-dom';
import { createMovie } from 'src/services';
import styles from './styles.module.scss';

const MovieCreatePage = () => {
  const navigate = useNavigate();

  const onFormSubmit = (data: FormData) =>
    createMovie(data).then((data) => {
      if (!data.error) {
        navigate(SPARoutes.MOVIE.replace(':id', data.id));
      }
    });

  return (
    <Layout>
      <Container>
        <h1 className={styles.title}>Створити фільм:</h1>
        <MovieForm onFormSubmit={onFormSubmit} />
      </Container>
    </Layout>
  );
};

export { MovieCreatePage };
