import type { IUser } from '@common';
import { useAppSelector } from '@hooks';
import { shallowEqual } from 'react-redux';
import { getAccessToken } from 'src/services';
import { useMemo } from 'react';

type UseAuth = () => {
  user: IUser | null;
  loading: boolean;
  hasToken: boolean;
};

export const useAuth: UseAuth = () => {
  const { user, loading } = useAppSelector((state) => state.auth, shallowEqual);

  const hasToken = !!getAccessToken();

  return useMemo(
    () => ({
      user,
      loading,
      hasToken,
    }),
    [user, loading, hasToken],
  );
};
