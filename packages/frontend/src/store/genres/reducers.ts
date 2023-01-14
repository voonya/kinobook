import { createReducer } from '@reduxjs/toolkit';
import type { IGenre } from '@common';
import { combineReducers } from 'redux';
import {
  dispatchGetGenres,
  dispatchCreateGenre,
  dispatchDeleteGenre,
  dispatchUpdateGenre,
  clearGenresErrors,
} from './actions';

export interface GenresState {
  data: IGenre[] | null;
  error: string;
  loading: boolean;
}

const data = createReducer<IGenre[] | null>(null, {
  [dispatchGetGenres.fulfilled.type]: (_, { payload }) => payload,
  [dispatchGetGenres.rejected.type]: () => [],

  [dispatchCreateGenre.fulfilled.type]: (state, { payload }) =>
    state ? [payload, ...state] : [payload],

  [dispatchDeleteGenre.fulfilled.type]: (state, { payload }) => {
    if (!state) return;

    const findIndex = state.findIndex(
      (genre: IGenre) => genre.id === payload.id,
    );

    if (findIndex === -1) {
      return;
    }
    const newGenres = [
      ...state.slice(0, findIndex),
      ...state.slice(findIndex + 1),
    ];

    return [...newGenres];
  },

  [dispatchUpdateGenre.fulfilled.type]: (state, { payload }) => {
    if (!state) return;

    const findIndex = state.findIndex(
      (genre: IGenre) => genre.id === payload.id,
    );

    if (findIndex === -1) {
      return;
    }
    const newGenres = [...state];
    newGenres[findIndex] = payload;

    return [...newGenres];
  },
});

const loading = createReducer(false, {
  [dispatchGetGenres.pending.type]: () => true,
  [dispatchGetGenres.fulfilled.type]: () => false,
  [dispatchGetGenres.rejected.type]: () => false,

  [dispatchCreateGenre.pending.type]: () => true,
  [dispatchCreateGenre.fulfilled.type]: () => false,
  [dispatchCreateGenre.rejected.type]: () => false,

  [dispatchDeleteGenre.pending.type]: () => true,
  [dispatchDeleteGenre.fulfilled.type]: () => false,
  [dispatchDeleteGenre.rejected.type]: () => false,

  [dispatchUpdateGenre.pending.type]: () => true,
  [dispatchUpdateGenre.fulfilled.type]: () => false,
  [dispatchUpdateGenre.rejected.type]: () => false,
});

const error = createReducer('', {
  [dispatchGetGenres.pending.type]: () => '',
  [dispatchGetGenres.rejected.type]: (_, { payload }) => payload,

  [dispatchCreateGenre.pending.type]: () => '',
  [dispatchCreateGenre.rejected.type]: (_, { payload }) => payload,

  [dispatchUpdateGenre.pending.type]: () => '',
  [dispatchUpdateGenre.rejected.type]: (_, { payload }) => payload,

  [clearGenresErrors.type]: () => '',
});

export const genreReducer = combineReducers({
  data,
  error,
  loading,
});
