import { createAsyncThunk } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import type { ILoginRequest } from '@common';
import { SPARoutes } from '@common';
import { login, getCurrentUser, logout } from 'src/services/auth';

export enum AuthActions {
  LOGIN = 'LOGIN',
  GET_USER = 'GET_USER',
  LOGOUT = 'LOGOUT',
}

const loginUser = createAsyncThunk(
  AuthActions.LOGIN,
  (data: ILoginRequest, { rejectWithValue }) =>
    login(data)
      .then((data) => {
        console.log(data);

        if (data.error) {
          return rejectWithValue(data.error[0]);
        }

        return data;
      })
      .catch((e) => {
        console.log(e);

        return rejectWithValue(e);
      }),
);

const getAuthUser = createAsyncThunk(
  AuthActions.GET_USER,
  (_, { rejectWithValue }) =>
    getCurrentUser()
      .then((data) => {
        console.log(data);

        if (data.error) {
          return rejectWithValue(data.error[0]);
        }

        return data;
      })
      .catch((e) => {
        console.log(e);

        return rejectWithValue(e);
      }),
);

const logoutUser = createAsyncThunk(
  AuthActions.LOGOUT,
  (_, { rejectWithValue }) =>
    logout()
      .then((data) => {
        if (data.error) {
          return rejectWithValue(data.error[0]);
        }

        redirect(SPARoutes.LOGIN);
        window.location.reload();

        return null;
      })
      .catch((e) => {
        console.log(e);

        return rejectWithValue(e);
      }),
);

export { loginUser, getAuthUser, logoutUser };
