import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  dispatchCreateBookmark,
  dispatchMoviesIdBookmarks,
  dispatchDeleteBookmark,
} from './actions';

export interface BookmarksState {
  data: string[];
}

const data = createReducer<string[]>([], {
  [dispatchCreateBookmark.fulfilled.type]: (state, { payload }) => {
    if (payload) {
      return [...state, payload.movieId];
    }
  },
  [dispatchMoviesIdBookmarks.fulfilled.type]: (state, { payload }) => {
    if (payload) {
      return payload;
    }
  },
  [dispatchDeleteBookmark.fulfilled.type]: (state, { payload }) => {
    if (!payload) {
      return;
    }
    const findIndex = state.findIndex((id: string) => id === payload.movieId);
    if (findIndex === -1) {
      return;
    }
    const newIds = [
      ...state.slice(0, findIndex),
      ...state.slice(findIndex + 1),
    ];

    return [...newIds];
  },
});

const loading = createReducer(false, {
  [dispatchCreateBookmark.pending.type]: () => true,
  [dispatchCreateBookmark.fulfilled.type]: () => false,
  [dispatchCreateBookmark.rejected.type]: () => false,

  [dispatchMoviesIdBookmarks.pending.type]: () => true,
  [dispatchMoviesIdBookmarks.fulfilled.type]: () => false,
  [dispatchMoviesIdBookmarks.rejected.type]: () => false,

  [dispatchDeleteBookmark.pending.type]: () => true,
  [dispatchDeleteBookmark.fulfilled.type]: () => false,
  [dispatchDeleteBookmark.rejected.type]: () => false,
});

export const bookmarksReducer = combineReducers({
  data,
  loading,
});
