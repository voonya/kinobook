import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMoviesIdInViewed,
  createViewed,
  updateViewed,
  deleteViewed,
} from 'src/services';
import type { ICreateViewed } from '@common';
import { closeViewModal, clearViewModal } from '../viewed-modal';

export enum ViewedActions {
  GET_MOVIES_ID_VIEWED = 'GET_MOVIES_ID_VIEWED',
  CREATE = 'CREATE_VIEWED',
  DELETE = 'DELETE_VIEWED',
  UPDATE = 'UPDATE_VIEWED',
}

const dispatchMoviesIdViewed = createAsyncThunk(
  ViewedActions.GET_MOVIES_ID_VIEWED,
  (_, { rejectWithValue }) =>
    getMoviesIdInViewed()
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

const dispatchCreateViewed = createAsyncThunk(
  ViewedActions.CREATE,
  (data: ICreateViewed, { rejectWithValue, dispatch }) =>
    createViewed(data)
      .then((data) => {
        if (data.error) {
          return rejectWithValue(data.error[0]);
        }
        dispatch(clearViewModal());
        dispatch(closeViewModal());

        return data;
      })
      .catch((e) => {
        console.log(e);

        return rejectWithValue(e);
      }),
);

const dispatchDeleteViewed = createAsyncThunk(
  ViewedActions.DELETE,
  (movieId: string, { rejectWithValue }) =>
    deleteViewed(movieId)
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

const dispatchUpdateViewed = createAsyncThunk(
  ViewedActions.UPDATE,
  (
    { id, data }: { id: string; data: ICreateViewed },
    { rejectWithValue, dispatch },
  ) =>
    updateViewed(id, data)
      .then((data) => {
        if (data.error) {
          return rejectWithValue(data.error[0]);
        }
        dispatch(clearViewModal());
        dispatch(closeViewModal());

        return data;
      })
      .catch((e) => {
        console.log(e);

        return rejectWithValue(e);
      }),
);

export {
  dispatchMoviesIdViewed,
  dispatchCreateViewed,
  dispatchDeleteViewed,
  dispatchUpdateViewed,
};
