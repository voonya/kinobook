import { AuthLayout, LoginForm } from '@components';
import { useTitle } from '@hooks';
import { SPARoutes } from '@common';
import './styles.scss';

export const LoginPage = () => {
  useTitle(SPARoutes.LOGIN);

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
