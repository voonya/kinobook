import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllGenres } from 'src/services';

export enum GenresActions {
  GET_ALL = 'GET_ALL_GENRES',
}

const getGenres = createAsyncThunk(
  GenresActions.GET_ALL,
  (_, { rejectWithValue }) =>
    getAllGenres()
      .then((data) => {
        console.log(data);

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

export { getGenres };
