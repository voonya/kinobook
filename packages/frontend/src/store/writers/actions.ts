import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllWriters } from 'src/services';

export enum WritersActions {
  GET_ALL = 'GET_ALL_WRITERS',
}

const getWriters = createAsyncThunk(
  WritersActions.GET_ALL,
  (_, { rejectWithValue }) =>
    getAllWriters()
      .then((data) => {
        console.log(data);

        if (data.error) {
          return rejectWithValue(data.error[0]);
        }

        return data.writers;
      })
      .catch((e) => {
        console.log(e);

        return rejectWithValue(e);
      }),
);

export { getWriters };
