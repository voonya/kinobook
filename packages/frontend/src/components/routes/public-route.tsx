import { SPARoutes } from '@common';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@hooks';

interface PublicRouteProps {
  children: JSX.Element;
  redirectLink?: SPARoutes;
}

export const PublicRoute = ({
  children,
  redirectLink = SPARoutes.HOME,
}: PublicRouteProps) => {
  const currentPath = useLocation().pathname;
  const user = useAppSelector((state) => state.auth.user);

  const restrictedRoutes: string[] = [SPARoutes.LOGIN, SPARoutes.REGISTER];

  if (user && restrictedRoutes.includes(currentPath)) {
    return <Navigate to={redirectLink} replace />;
  }

  return children;
};
