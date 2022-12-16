import { createReducer } from '@reduxjs/toolkit';
import type { IWriter } from '@common';
import { combineReducers } from 'redux';
import { getWriters } from './actions';

export interface WritersState {
  writers: IWriter[] | null;
  error: string;
  loading: boolean;
}

const writers = createReducer<IWriter[] | null>(null, {
  [getWriters.fulfilled.type]: (_, { payload }) => payload,
  [getWriters.rejected.type]: () => [],
});

const loading = createReducer(false, {
  [getWriters.pending.type]: () => true,
  [getWriters.fulfilled.type]: () => false,
  [getWriters.rejected.type]: () => false,
});

const error = createReducer('', {
  [getWriters.pending.type]: () => '',
  [getWriters.rejected.type]: (_, { payload }) => payload,
});

export const writerReducer = combineReducers({
  writers,
  error,
  loading,
});
