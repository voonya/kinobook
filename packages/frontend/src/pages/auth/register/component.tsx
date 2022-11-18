import { AuthLayout, RegisterForm } from '@components';
import { useTitle } from '@hooks';
import { SPARoutes } from '@common';
import './styles.scss';

export const RegisterPage = () => {
  useTitle(SPARoutes.REGISTER);

  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
