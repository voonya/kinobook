import { useTitle } from '@hooks';
import { SPARoutes } from '@common';
import { Layout, Spinner } from '@components';

const HomePage = () => {
  useTitle(SPARoutes.HOME);

  return (
    <Layout>
      <Spinner />
    </Layout>
  );
};

export { HomePage };
