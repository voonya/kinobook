import { useParams, useNavigate } from 'react-router-dom';
import type { IMovie } from '@common';
import { SPARoutes } from '@common';
import { useTitle } from '@hooks';
import { Layout, Movie, Spinner } from '@components';
import { useEffect, useState } from 'react';
import { getMovie } from 'src/services';

const MoviePage = () => {
  useTitle(SPARoutes.MOVIE);
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate(SPARoutes.NOT_FOUND);
    }

    setIsLoading(true);
    getMovie(id!)
      .then((data) => {
        if (data.error) {
          navigate(SPARoutes.NOT_FOUND);
        }

        setMovie(data);
      })
      .finally(() => setIsLoading(false));
  }, [id, navigate]);

  return (
    <Layout>
      {isLoading || !movie ? <Spinner size="lg" /> : <Movie movie={movie} />}
    </Layout>
  );
};

export { MoviePage };
