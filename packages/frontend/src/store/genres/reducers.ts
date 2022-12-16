import { createReducer } from '@reduxjs/toolkit';
import type { IGenre } from '@common';
import { combineReducers } from 'redux';
import { getGenres } from './actions';

export interface GenresState {
  genres: IGenre[] | null;
  error: string;
  loading: boolean;
}

const genres = createReducer<IGenre[] | null>(null, {
  [getGenres.fulfilled.type]: (_, { payload }) => payload,
  [getGenres.rejected.type]: () => [],
});

const loading = createReducer(false, {
  [getGenres.pending.type]: () => true,
  [getGenres.fulfilled.type]: () => false,
  [getGenres.rejected.type]: () => false,
});

const error = createReducer('', {
  [getGenres.pending.type]: () => '',
  [getGenres.rejected.type]: (_, { payload }) => payload,
});

export const genreReducer = combineReducers({
  genres,
  error,
  loading,
});
