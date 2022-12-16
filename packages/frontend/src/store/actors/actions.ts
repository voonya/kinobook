import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllActors } from 'src/services';

export enum ActorsActions {
  GET_ALL = 'GET_ALL_ACTORS',
}

const getActors = createAsyncThunk(
  ActorsActions.GET_ALL,
  (_, { rejectWithValue }) =>
    getAllActors()
      .then((data) => {
        console.log(data);

        if (data.error) {
          return rejectWithValue(data.error[0]);
        }

        return data.actors;
      })
      .catch((e) => {
        console.log(e);

        return rejectWithValue(e);
      }),
);

export { getActors };
