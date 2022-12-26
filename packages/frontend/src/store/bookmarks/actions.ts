import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMoviesIdsInBookmarks,
  createBookmark,
  deleteBookmark,
} from 'src/services';

export enum BookmarksActions {
  GET_MOVIES_ID_BOOKMARKS = 'GET_MOVIES_ID_BOOKMARKS',
  CREATE_BOOKMARK = 'CREATE_BOOKMARK',
  DELETE_BOOKMARK = 'DELETE_BOOKMARK',
}

const dispatchMoviesIdBookmarks = createAsyncThunk(
  BookmarksActions.GET_MOVIES_ID_BOOKMARKS,
  (_, { rejectWithValue }) =>
    getMoviesIdsInBookmarks()
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

const dispatchCreateBookmark = createAsyncThunk(
  BookmarksActions.CREATE_BOOKMARK,
  (movieId: string, { rejectWithValue }) =>
    createBookmark(movieId)
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

const dispatchDeleteBookmark = createAsyncThunk(
  BookmarksActions.DELETE_BOOKMARK,
  (movieId: string, { rejectWithValue }) =>
    deleteBookmark(movieId)
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
  dispatchMoviesIdBookmarks,
  dispatchCreateBookmark,
  dispatchDeleteBookmark,
};
