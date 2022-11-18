import { Layout, Profile } from '@components';
import type { IUser } from '@common';
import { SPARoutes } from '@common';
import { Role } from '@common';
import { useTitle } from '@hooks';

const ProfilePage = () => {
  useTitle(SPARoutes.PROFILE);

  const user: IUser = {
    id: '1',
    email: 'dlyarobot@gmail.com',
    username: 'voonya',
    role: Role.ADMIN,
  };

  return (
    <Layout>
      <Profile user={user} />
    </Layout>
  );
};

export { ProfilePage };
