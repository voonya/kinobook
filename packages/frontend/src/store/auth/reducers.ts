import { createReducer } from '@reduxjs/toolkit';
import type { IUser } from '@common';
import { combineReducers } from 'redux';
import {
  loginUser,
  getAuthUser,
  logoutUser,
  registerUser,
  clearAuthErrors,
} from './actions';

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

  [logoutUser.fulfilled.type]: (_) => null,
  [logoutUser.rejected.type]: () => null,

  [registerUser.fulfilled.type]: (_, { payload }) => payload,
  [registerUser.rejected.type]: () => null,
});

const loading = createReducer(false, {
  [loginUser.pending.type]: () => true,
  [loginUser.fulfilled.type]: () => false,
  [loginUser.rejected.type]: () => false,

  [registerUser.pending.type]: () => true,
  [registerUser.fulfilled.type]: () => false,
  [registerUser.rejected.type]: () => false,

  [getAuthUser.pending.type]: () => true,
  [getAuthUser.fulfilled.type]: () => false,
  [getAuthUser.rejected.type]: () => false,
});

const error = createReducer('', {
  [loginUser.pending.type]: () => '',
  [loginUser.rejected.type]: (_, { payload }) => payload,

  [registerUser.pending.type]: () => '',
  [registerUser.rejected.type]: (_, { payload }) => payload,

  [clearAuthErrors.type]: () => '',
});

export const authReducer = combineReducers({
  user,
  error,
  loading,
});
