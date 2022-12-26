import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllGenres,
  createGenre,
  deleteGenre,
  updateGenre,
} from 'src/services';

export enum GenresActions {
  GET_ALL = 'GET_ALL_GENRES',
  CREATE = 'CREATE_GENRES',
  UPDATE = 'UPDATE_GENRES',
  DELETE = 'DELETE_GENRES',
}

interface ICreateGenre {
  id: string;
  name: string;
}
const dispatchGetGenres = createAsyncThunk(
  GenresActions.GET_ALL,
  (_, { rejectWithValue }) =>
    getAllGenres()
      .then((data) => {
        if (data.error) {
          return rejectWithValue(data.error[0]);
        }

        return data.genres;
      })
      .catch((e) => {
        console.log(e);

        return rejectWithValue(e);
      }),
);

const dispatchCreateGenre = createAsyncThunk(
  GenresActions.CREATE,
  (name: string, { rejectWithValue }) =>
    createGenre(name)
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

const dispatchUpdateGenre = createAsyncThunk(
  GenresActions.UPDATE,
  ({ id, name }: ICreateGenre, { rejectWithValue }) =>
    updateGenre(id, name)
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

const dispatchDeleteGenre = createAsyncThunk(
  GenresActions.DELETE,
  (id: string, { rejectWithValue }) =>
    deleteGenre(id)
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

export {
  dispatchGetGenres,
  dispatchCreateGenre,
  dispatchUpdateGenre,
  dispatchDeleteGenre,
};
