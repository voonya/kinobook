import { createReducer } from '@reduxjs/toolkit';
import type { IActor } from '@common';
import { combineReducers } from 'redux';
import { getActors } from './actions';

export interface ActorsState {
  actors: IActor[] | null;
  error: string;
  loading: boolean;
}

const actors = createReducer<IActor[] | null>(null, {
  [getActors.fulfilled.type]: (_, { payload }) => payload,
  [getActors.rejected.type]: () => [],
});

const loading = createReducer(false, {
  [getActors.pending.type]: () => true,
  [getActors.fulfilled.type]: () => false,
  [getActors.rejected.type]: () => false,
});

const error = createReducer('', {
  [getActors.pending.type]: () => '',
  [getActors.rejected.type]: (_, { payload }) => payload,
});

export const actorsReducer = combineReducers({
  actors,
  error,
  loading,
});
