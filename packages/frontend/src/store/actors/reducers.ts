import { createReducer } from '@reduxjs/toolkit';
import type { IActor } from '@common';
import { combineReducers } from 'redux';
import {
  dispatchGetActors,
  dispatchCreateActor,
  dispatchDeleteActor,
  dispatchUpdateActor,
} from './actions';

export interface ActorsState {
  data: IActor[] | null;
  error: string;
  loading: boolean;
}

const data = createReducer<IActor[] | null>(null, {
  [dispatchGetActors.fulfilled.type]: (_, { payload }) => payload,
  [dispatchGetActors.rejected.type]: () => [],

  [dispatchCreateActor.fulfilled.type]: (state, { payload }) =>
    state ? [payload, ...state] : [payload],

  [dispatchDeleteActor.fulfilled.type]: (state, { payload }) => {
    if (!state) return;

    const findIndex = state.findIndex(
      (actor: IActor) => actor.id === payload.id,
    );

    if (findIndex === -1) {
      return;
    }
    const newActors = [
      ...state.slice(0, findIndex),
      ...state.slice(findIndex + 1),
    ];

    return [...newActors];
  },

  [dispatchUpdateActor.fulfilled.type]: (state, { payload }) => {
    if (!state) return;

    const findIndex = state.findIndex(
      (genre: IActor) => genre.id === payload.id,
    );

    if (findIndex === -1) {
      return;
    }
    const newActors = [...state];
    newActors[findIndex] = payload;

    return [...newActors];
  },
});

const loading = createReducer(false, {
  [dispatchGetActors.pending.type]: () => true,
  [dispatchGetActors.fulfilled.type]: () => false,
  [dispatchGetActors.rejected.type]: () => false,

  [dispatchCreateActor.pending.type]: () => true,
  [dispatchCreateActor.fulfilled.type]: () => false,
  [dispatchCreateActor.rejected.type]: () => false,

  [dispatchDeleteActor.pending.type]: () => true,
  [dispatchDeleteActor.fulfilled.type]: () => false,
  [dispatchDeleteActor.rejected.type]: () => false,

  [dispatchUpdateActor.pending.type]: () => true,
  [dispatchUpdateActor.fulfilled.type]: () => false,
  [dispatchUpdateActor.rejected.type]: () => false,
});

const error = createReducer('', {
  [dispatchGetActors.pending.type]: () => '',
  [dispatchGetActors.rejected.type]: (_, { payload }) => payload,
});

export const actorsReducer = combineReducers({
  data,
  error,
  loading,
});
