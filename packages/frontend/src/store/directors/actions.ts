import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
  getAllDirectors,
  createDirector,
  updateDirector,
  deleteDirector,
} from 'src/services';

export enum DirectorsActions {
  GET_ALL = 'GET_ALL_DIRECTORS',
  CREATE = 'CREATE_DIRECTORS',
  UPDATE = 'UPDATE_DIRECTORS',
  DELETE = 'DELETE_DIRECTORS',
  CLEAR_ERRORS = 'CLEAR_ERRORS_DIRECTORS',
}

interface ICreateDirector {
  name: string;
  surname: string;
}
interface IUpdateDirector {
  id: string;
  name: string;
  surname: string;
}

const dispatchGetDirectors = createAsyncThunk(
  DirectorsActions.GET_ALL,
  (_, { rejectWithValue }) =>
    getAllDirectors()
      .then((data) => {
        if (data.error) {
          return rejectWithValue(data.error[0]);
        }

        return data.directors;
      })
      .catch((e) => {
        console.log(e);

        return rejectWithValue(e);
      }),
);

const dispatchCreateDirector = createAsyncThunk(
  DirectorsActions.CREATE,
  ({ name, surname }: ICreateDirector, { rejectWithValue }) =>
    createDirector(name, surname)
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

const dispatchUpdateDirector = createAsyncThunk(
  DirectorsActions.UPDATE,
  ({ id, name, surname }: IUpdateDirector, { rejectWithValue }) =>
    updateDirector(id, name, surname)
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

const dispatchDeleteDirector = createAsyncThunk(
  DirectorsActions.DELETE,
  (id: string, { rejectWithValue }) =>
    deleteDirector(id)
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

const clearDirectorsErrors = createAction(DirectorsActions.CLEAR_ERRORS);

export {
  dispatchGetDirectors,
  dispatchCreateDirector,
  dispatchUpdateDirector,
  dispatchDeleteDirector,
  clearDirectorsErrors,
};
