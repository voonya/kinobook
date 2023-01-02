import { SPARoutes, Role } from '@common';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks';

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
  const roles = [Role.USER, Role.MODERATOR, Role.ADMIN];
  const { user, hasToken } = useAuth();

  if (
    (!user && !hasToken) ||
    (user &&
      role &&
      user.role &&
      roles.indexOf(user.role) < roles.indexOf(role))
  ) {
    return <Navigate to={redirectLink || SPARoutes.HOME} replace />;
  }

  return children;
};
