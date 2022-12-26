import { AuthLayout, RegisterForm, PublicRoute } from '@components';
import { useTitle } from '@hooks';
import { SPARoutes } from '@common';
import './styles.scss';

const Component = () => {
  useTitle(SPARoutes.REGISTER);

  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export const RegisterPage = () => (
  <PublicRoute>
    <Component />
  </PublicRoute>
);
