import type { SPARoutes } from '@common';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectLink: SPARoutes;
}

export const ProtectedRoute = ({
  children,
  redirectLink,
}: ProtectedRouteProps) => {
  const auth = false;

  if (!auth) {
    return <Navigate to={redirectLink} replace />;
  }

  return children;
};
