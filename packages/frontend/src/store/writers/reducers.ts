import { createReducer } from '@reduxjs/toolkit';
import type { IWriter } from '@common';
import { combineReducers } from 'redux';
import {
  dispatchGetWriters,
  dispatchCreateWriter,
  dispatchDeleteWriter,
  dispatchUpdateWriter,
} from './actions';

export interface WritersState {
  data: IWriter[] | null;
  error: string;
  loading: boolean;
}

const data = createReducer<IWriter[] | null>(null, {
  [dispatchGetWriters.fulfilled.type]: (_, { payload }) => payload,
  [dispatchGetWriters.rejected.type]: () => [],

  [dispatchCreateWriter.fulfilled.type]: (state, { payload }) =>
    state ? [payload, ...state] : [payload],

  [dispatchDeleteWriter.fulfilled.type]: (state, { payload }) => {
    if (!state) return;

    const findIndex = state.findIndex(
      (writer: IWriter) => writer.id === payload.id,
    );

    if (findIndex === -1) {
      return;
    }
    const newWriters = [
      ...state.slice(0, findIndex),
      ...state.slice(findIndex + 1),
    ];

    return [...newWriters];
  },

  [dispatchUpdateWriter.fulfilled.type]: (state, { payload }) => {
    if (!state) return;

    const findIndex = state.findIndex(
      (writer: IWriter) => writer.id === payload.id,
    );

    if (findIndex === -1) {
      return;
    }
    const newWriters = [...state];
    newWriters[findIndex] = payload;

    return [...newWriters];
  },
});

const loading = createReducer(false, {
  [dispatchGetWriters.pending.type]: () => true,
  [dispatchGetWriters.fulfilled.type]: () => false,
  [dispatchGetWriters.rejected.type]: () => false,

  [dispatchCreateWriter.pending.type]: () => true,
  [dispatchCreateWriter.fulfilled.type]: () => false,
  [dispatchCreateWriter.rejected.type]: () => false,

  [dispatchDeleteWriter.pending.type]: () => true,
  [dispatchDeleteWriter.fulfilled.type]: () => false,
  [dispatchDeleteWriter.rejected.type]: () => false,

  [dispatchUpdateWriter.pending.type]: () => true,
  [dispatchUpdateWriter.fulfilled.type]: () => false,
  [dispatchUpdateWriter.rejected.type]: () => false,
});

const error = createReducer('', {
  [dispatchGetWriters.pending.type]: () => '',
  [dispatchGetWriters.rejected.type]: (_, { payload }) => payload,
});

export const writerReducer = combineReducers({
  data,
  error,
  loading,
});
