import { createReducer } from '@reduxjs/toolkit';
import type { ICountry } from '@common';
import { combineReducers } from 'redux';
import {
  dispatchGetCountries,
  dispatchCreateCountry,
  dispatchDeleteCountry,
  dispatchUpdateCountry,
} from './actions';

export interface CountriesState {
  data: ICountry[] | null;
  error: string;
  loading: boolean;
}

const data = createReducer<ICountry[] | null>(null, {
  [dispatchGetCountries.fulfilled.type]: (_, { payload }) => payload,
  [dispatchGetCountries.rejected.type]: () => [],

  [dispatchCreateCountry.fulfilled.type]: (state, { payload }) =>
    state ? [payload, ...state] : [payload],

  [dispatchDeleteCountry.fulfilled.type]: (state, { payload }) => {
    if (!state) return;

    const findIndex = state.findIndex(
      (country: ICountry) => country.id === payload.id,
    );

    if (findIndex === -1) {
      return;
    }
    const newCountries = [
      ...state.slice(0, findIndex),
      ...state.slice(findIndex + 1),
    ];

    return [...newCountries];
  },

  [dispatchUpdateCountry.fulfilled.type]: (state, { payload }) => {
    if (!state) return;

    const findIndex = state.findIndex(
      (country: ICountry) => country.id === payload.id,
    );

    if (findIndex === -1) {
      return;
    }
    const newCountries = [...state];
    newCountries[findIndex] = payload;

    return [...newCountries];
  },
});

const loading = createReducer(false, {
  [dispatchGetCountries.pending.type]: () => true,
  [dispatchGetCountries.fulfilled.type]: () => false,
  [dispatchGetCountries.rejected.type]: () => false,

  [dispatchCreateCountry.pending.type]: () => true,
  [dispatchCreateCountry.fulfilled.type]: () => false,
  [dispatchCreateCountry.rejected.type]: () => false,

  [dispatchDeleteCountry.pending.type]: () => true,
  [dispatchDeleteCountry.fulfilled.type]: () => false,
  [dispatchDeleteCountry.rejected.type]: () => false,

  [dispatchUpdateCountry.pending.type]: () => true,
  [dispatchUpdateCountry.fulfilled.type]: () => false,
  [dispatchUpdateCountry.rejected.type]: () => false,
});

const error = createReducer('', {
  [dispatchGetCountries.pending.type]: () => '',
  [dispatchGetCountries.rejected.type]: (_, { payload }) => payload,
});

export const countriesReducer = combineReducers({
  data,
  error,
  loading,
});
