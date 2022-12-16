import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAuth } from '@hooks';
import { getAuthUser } from 'src/store/auth';

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const { user, hasToken } = useAuth();
  const dispatch = useAppDispatch();

  const hasUser = !!user;

  useEffect(() => {
    if (!hasUser) {
      dispatch(getAuthUser());
    }
  }, [dispatch, hasToken, hasUser]);

  return <>{children}</>;
};

export { UserProvider };
