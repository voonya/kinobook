import { createReducer } from '@reduxjs/toolkit';
import type { IDirector } from '@common';
import { combineReducers } from 'redux';
import {
  dispatchGetDirectors,
  dispatchCreateDirector,
  dispatchDeleteDirector,
  dispatchUpdateDirector,
  clearDirectorsErrors,
} from './actions';

export interface DirectorsState {
  data: IDirector[] | null;
  error: string;
  loading: boolean;
}

const data = createReducer<IDirector[] | null>(null, {
  [dispatchGetDirectors.fulfilled.type]: (_, { payload }) => payload,
  [dispatchGetDirectors.rejected.type]: () => [],

  [dispatchCreateDirector.fulfilled.type]: (state, { payload }) =>
    state ? [payload, ...state] : [payload],

  [dispatchDeleteDirector.fulfilled.type]: (state, { payload }) => {
    if (!state) return;

    const findIndex = state.findIndex(
      (director: IDirector) => director.id === payload.id,
    );

    if (findIndex === -1) {
      return;
    }
    const newDirectors = [
      ...state.slice(0, findIndex),
      ...state.slice(findIndex + 1),
    ];

    return [...newDirectors];
  },

  [dispatchUpdateDirector.fulfilled.type]: (state, { payload }) => {
    if (!state) return;

    const findIndex = state.findIndex(
      (director: IDirector) => director.id === payload.id,
    );

    if (findIndex === -1) {
      return;
    }
    const newDirectors = [...state];
    newDirectors[findIndex] = payload;

    return [...newDirectors];
  },
});

const loading = createReducer(false, {
  [dispatchGetDirectors.pending.type]: () => true,
  [dispatchGetDirectors.fulfilled.type]: () => false,
  [dispatchGetDirectors.rejected.type]: () => false,

  [dispatchCreateDirector.pending.type]: () => true,
  [dispatchCreateDirector.fulfilled.type]: () => false,
  [dispatchCreateDirector.rejected.type]: () => false,

  [dispatchDeleteDirector.pending.type]: () => true,
  [dispatchDeleteDirector.fulfilled.type]: () => false,
  [dispatchDeleteDirector.rejected.type]: () => false,

  [dispatchUpdateDirector.pending.type]: () => true,
  [dispatchUpdateDirector.fulfilled.type]: () => false,
  [dispatchUpdateDirector.rejected.type]: () => false,
});

const error = createReducer('', {
  [dispatchGetDirectors.pending.type]: () => '',
  [dispatchGetDirectors.rejected.type]: (_, { payload }) => payload,

  [dispatchCreateDirector.pending.type]: () => '',
  [dispatchCreateDirector.rejected.type]: (_, { payload }) => payload,
  [dispatchUpdateDirector.pending.type]: () => '',
  [dispatchUpdateDirector.rejected.type]: (_, { payload }) => payload,
  [clearDirectorsErrors.type]: () => '',
});

export const directorReducer = combineReducers({
  data,
  error,
  loading,
});
