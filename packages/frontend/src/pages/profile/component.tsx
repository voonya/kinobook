import { Layout, Profile, Spinner } from '@components';
import type { IUser } from '@common';
import { ApiRoutes, UserRoutes } from '@common';
import { SPARoutes } from '@common';
import { useTitle } from '@hooks';
import { useEffect, useState } from 'react';
import { getApiRoute } from 'src/helpers';
import { useParams, useNavigate } from 'react-router-dom';
import { http } from 'src/helpers';
import styles from './styles.module.scss';

const ProfilePage = () => {
  useTitle(SPARoutes.PROFILE);

  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  if (!id) {
    navigate(SPARoutes.NOT_FOUND);
  }

  useEffect(() => {
    setIsLoading(true);
    http
      .get(
        getApiRoute(ApiRoutes.USER, UserRoutes.GET_BY_ID).replace(
          ':id',
          id as string,
        ),
      )
      .then((data) => {
        if (data?.error) {
          navigate(SPARoutes.NOT_FOUND);
        }
        setUser(data);
      })
      .finally(() => setIsLoading(false));
  }, [id, navigate]);

  return (
    <Layout>
      <div className={styles.wrapper}>
        {user && <Profile user={user} />}
        {!user && isLoading && <Spinner size="lg" />}
      </div>
    </Layout>
  );
};

export { ProfilePage };
