import { SPARoutes } from '@common';
import { Navigate, useLocation } from 'react-router-dom';

interface PublicRouteProps {
  children: JSX.Element;
  redirectLink?: SPARoutes;
}

export const PublicRoute = ({
  children,
  redirectLink = SPARoutes.HOME,
}: PublicRouteProps) => {
  const currentPath = useLocation().pathname;

  const restrictedRoutes: string[] = [SPARoutes.LOGIN, SPARoutes.REGISTER];
  const auth = false;

  if (auth && restrictedRoutes.includes(currentPath)) {
    return <Navigate to={redirectLink} replace />;
  }

  return children;
};
