import { useTitle } from '@hooks';
import type { IMovie } from '@common';
import { SPARoutes } from '@common';
import {
  Layout,
  Container,
  MovieCard,
  Input,
  Button,
  IconName,
} from '@components';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useAppSelector } from '@hooks';
import { getUserRecommendation, getAllMovies } from 'src/services';
import { useEffect, useRef, useState } from 'react';
import bg from '@assets/images/home-bg.jpg';
import styles from './styles.module.scss';

const HomePage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useTitle(SPARoutes.HOME);

  useEffect(() => {
    setIsLoading(true);
    const cb = user
      ? getUserRecommendation({ limit: 5 })
      : getAllMovies({ limit: 5 });
    cb.then((res) => {
      if (!res.error) {
        setMovies(res.data);
      }
    }).finally(() => setIsLoading(false));
  }, [user]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const redirectToCatalogueBySearch = () => {
    if (!searchInputRef.current?.value) return;

    navigate({
      pathname: SPARoutes.CATALOGUE,
      search: createSearchParams({
        title: searchInputRef.current?.value,
      }).toString(),
    });
  };

  const redirectToCatalogue = () => {
    navigate(SPARoutes.CATALOGUE);
  };

  const redirectToRecommendations = () => {
    navigate(SPARoutes.RECOMMENDATIONS);
  };

  return (
    <Layout>
      <Container style={{ width: '100%' }}>
        <div className={styles.wrapper}>
          <div className={styles.search}>
            <div className={styles.searchTitle}>KinoBook</div>
            <img src={bg} alt="" />
            <div className={styles.searchInput}>
              <Input
                errorBlock={false}
                color={'dark'}
                ref={searchInputRef}
                icon={IconName.GLASS}
                onIconClick={redirectToCatalogueBySearch}
              />
            </div>
          </div>
          {!isLoading && movies.length > 0 && (
            <div className={styles.recommendationsWrapper}>
              <h3>You might like</h3>
              <div className={styles.recommendations}>
                {movies.map((movie) => (
                  <MovieCard key={movie.id + Math.random()} movie={movie} />
                ))}
              </div>
              <div className={styles.controls}>
                <Button
                  onClick={
                    user ? redirectToRecommendations : redirectToCatalogue
                  }
                >
                  More
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export { HomePage };
