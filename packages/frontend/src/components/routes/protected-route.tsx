import { SPARoutes, Role } from '@common';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@hooks';

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectLink?: SPARoutes;
  role?: Role;
}

export const ProtectedRoute = ({
  children,
  redirectLink,
  role,
}: ProtectedRouteProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const roles = [Role.USER, Role.MODERATOR, Role.ADMIN];

  if (
    !user ||
    (role && user.role && roles.indexOf(user.role) < roles.indexOf(role))
  ) {
    return <Navigate to={redirectLink || SPARoutes.HOME} replace />;
  }

  return children;
};
