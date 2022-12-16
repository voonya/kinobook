import { createReducer } from '@reduxjs/toolkit';
import type { IUser } from '@common';
import { combineReducers } from 'redux';
import { loginUser, getAuthUser, logoutUser } from './actions';

export interface AuthState {
  user: IUser | null;
  error: string;
  loading: boolean;
}

const user = createReducer<IUser | null>(null, {
  [loginUser.fulfilled.type]: (_, { payload }) => payload,
  [loginUser.rejected.type]: () => null,

  [getAuthUser.fulfilled.type]: (_, { payload }) => payload,
  [getAuthUser.rejected.type]: () => null,

  [logoutUser.fulfilled.type]: (_, { payload }) => payload,
  [logoutUser.rejected.type]: () => null,
});

const loading = createReducer(false, {
  [loginUser.pending.type]: () => true,
  [loginUser.fulfilled.type]: () => false,
  [loginUser.rejected.type]: () => false,

  [getAuthUser.pending.type]: () => true,
  [getAuthUser.fulfilled.type]: () => false,
  [getAuthUser.rejected.type]: () => false,
});

const error = createReducer('', {
  [loginUser.pending.type]: () => '',
  [loginUser.rejected.type]: (_, { payload }) => payload,
});

export const authReducer = combineReducers({
  user,
  error,
  loading,
});
