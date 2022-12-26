import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllWriters,
  createWriter,
  updateWriter,
  deleteWriter,
} from 'src/services';

export enum WritersActions {
  GET_ALL = 'GET_ALL_WRITERS',
  CREATE = 'CREATE_WRITERS',
  UPDATE = 'UPDATE_WRITERS',
  DELETE = 'DELETE_WRITERS',
}

interface ICreateWriter {
  name: string;
  surname: string;
}
interface IUpdateWriter {
  id: string;
  name: string;
  surname: string;
}

const dispatchGetWriters = createAsyncThunk(
  WritersActions.GET_ALL,
  (_, { rejectWithValue }) =>
    getAllWriters()
      .then((data) => {
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

const dispatchCreateWriter = createAsyncThunk(
  WritersActions.CREATE,
  ({ name, surname }: ICreateWriter, { rejectWithValue }) =>
    createWriter(name, surname)
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

const dispatchUpdateWriter = createAsyncThunk(
  WritersActions.UPDATE,
  ({ id, name, surname }: IUpdateWriter, { rejectWithValue }) =>
    updateWriter(id, name, surname)
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

const dispatchDeleteWriter = createAsyncThunk(
  WritersActions.DELETE,
  (id: string, { rejectWithValue }) =>
    deleteWriter(id)
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
  dispatchGetWriters,
  dispatchCreateWriter,
  dispatchUpdateWriter,
  dispatchDeleteWriter,
};
