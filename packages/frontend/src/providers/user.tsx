import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAuth } from '@hooks';
import { getAuthUser } from 'src/store/auth';
import { dispatchMoviesIdBookmarks, dispatchMoviesIdViewed } from 'src/store';

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const { user, hasToken, loading } = useAuth();
  const dispatch = useAppDispatch();

  const hasUser = !!user;

  useEffect(() => {
    if (!hasUser && !loading) {
      dispatch(getAuthUser());
      dispatch(dispatchMoviesIdBookmarks());
      dispatch(dispatchMoviesIdViewed());
    }
  }, [dispatch, hasToken, hasUser, loading]);

  return <>{children}</>;
};

export { UserProvider };
