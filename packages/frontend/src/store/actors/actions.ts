import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllActors,
  createActor,
  updateActor,
  deleteActor,
} from 'src/services';

export enum ActorsActions {
  GET_ALL = 'GET_ALL_ACTORS',
  CREATE = 'CREATE_ACTORS',
  UPDATE = 'UPDATE_ACTORS',
  DELETE = 'DELETE_ACTORS',
}
interface ICreateActor {
  name: string;
  surname: string;
}
interface IUpdateActor {
  id: string;
  name: string;
  surname: string;
}

const dispatchGetActors = createAsyncThunk(
  ActorsActions.GET_ALL,
  (_, { rejectWithValue }) =>
    getAllActors()
      .then((data) => {
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

const dispatchCreateActor = createAsyncThunk(
  ActorsActions.CREATE,
  ({ name, surname }: ICreateActor, { rejectWithValue }) =>
    createActor(name, surname)
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

const dispatchUpdateActor = createAsyncThunk(
  ActorsActions.UPDATE,
  ({ id, name, surname }: IUpdateActor, { rejectWithValue }) =>
    updateActor(id, name, surname)
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

const dispatchDeleteActor = createAsyncThunk(
  ActorsActions.DELETE,
  (id: string, { rejectWithValue }) =>
    deleteActor(id)
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
  dispatchGetActors,
  dispatchCreateActor,
  dispatchUpdateActor,
  dispatchDeleteActor,
};
