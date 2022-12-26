import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  dispatchMoviesIdViewed,
  dispatchCreateViewed,
  dispatchDeleteViewed,
  dispatchUpdateViewed,
} from './actions';

export interface ViewedState {
  data: string[];
}

const data = createReducer<string[]>([], {
  [dispatchCreateViewed.fulfilled.type]: (state, { payload }) => {
    if (payload) {
      return [...state, payload.movieId];
    }
  },
  [dispatchMoviesIdViewed.fulfilled.type]: (state, { payload }) => {
    if (payload) {
      return payload;
    }
  },
  [dispatchDeleteViewed.fulfilled.type]: (state, { payload }) => {
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
  [dispatchDeleteViewed.pending.type]: () => true,
  [dispatchDeleteViewed.fulfilled.type]: () => false,
  [dispatchDeleteViewed.rejected.type]: () => false,

  [dispatchMoviesIdViewed.pending.type]: () => true,
  [dispatchMoviesIdViewed.fulfilled.type]: () => false,
  [dispatchMoviesIdViewed.rejected.type]: () => false,

  [dispatchCreateViewed.pending.type]: () => true,
  [dispatchCreateViewed.fulfilled.type]: () => false,
  [dispatchCreateViewed.rejected.type]: () => false,

  [dispatchUpdateViewed.pending.type]: () => true,
  [dispatchUpdateViewed.fulfilled.type]: () => false,
  [dispatchUpdateViewed.rejected.type]: () => false,
});

// const loading = createReducer(false, {
//   [getActors.pending.type]: () => true,
//   [getActors.fulfilled.type]: () => false,
//   [getActors.rejected.type]: () => false,
// });

// const error = createReducer('', {
//   [getActors.pending.type]: () => '',
//   [getActors.rejected.type]: (_, { payload }) => payload,
// });

export const viewedReducer = combineReducers({
  data,
  loading,
});
