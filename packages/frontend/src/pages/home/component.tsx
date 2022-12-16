import { useTitle } from '@hooks';
import { SPARoutes } from '@common';
import { Layout } from '@components';

const HomePage = () => {
  useTitle(SPARoutes.HOME);

  return (
    <Layout>
      <div>Home page</div>
    </Layout>
  );
};

export { HomePage };
