import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import type { ILoginRequest, IRegisterRequest } from '@common';
import { SPARoutes } from '@common';
import { login, getCurrentUser, logout, register } from 'src/services';
import { history } from 'src/helpers';

export enum AuthActions {
  LOGIN = 'LOGIN',
  GET_USER = 'GET_USER',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
  CLEAR_ERROR = 'CLEAR_AUTH_ERROR',
}

const loginUser = createAsyncThunk(
  AuthActions.LOGIN,
  (data: ILoginRequest, { rejectWithValue }) =>
    login(data)
      .then((data) => {
        if (data.error) {
          return rejectWithValue(data.error[0]);
        }

        history.push(SPARoutes.HOME);

        return data;
      })
      .catch((e) => {
        console.log(e);

        return rejectWithValue(e);
      }),
);

const registerUser = createAsyncThunk(
  AuthActions.REGISTER,
  (data: IRegisterRequest, { rejectWithValue }) =>
    register(data)
      .then((data) => {
        if (data.error) {
          return rejectWithValue(data.error[0]);
        }

        history.push(SPARoutes.HOME);

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

const clearAuthErrors = createAction(AuthActions.CLEAR_ERROR);

export { loginUser, getAuthUser, logoutUser, registerUser, clearAuthErrors };
