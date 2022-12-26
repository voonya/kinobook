import { AuthLayout, LoginForm, PublicRoute } from '@components';
import { useTitle } from '@hooks';
import { SPARoutes } from '@common';
import './styles.scss';

const Component = () => {
  useTitle(SPARoutes.LOGIN);

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export const LoginPage = () => (
  <PublicRoute>
    <Component />
  </PublicRoute>
);
