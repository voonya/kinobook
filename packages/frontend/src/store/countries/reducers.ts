import { createReducer } from '@reduxjs/toolkit';
import type { ICountry } from '@common';
import { combineReducers } from 'redux';
import { getCountries } from './actions';

export interface CountriesState {
  countries: ICountry[] | null;
  error: string;
  loading: boolean;
}

const countries = createReducer<ICountry[] | null>(null, {
  [getCountries.fulfilled.type]: (_, { payload }) => payload,
  [getCountries.rejected.type]: () => [],
});

const loading = createReducer(false, {
  [getCountries.pending.type]: () => true,
  [getCountries.fulfilled.type]: () => false,
  [getCountries.rejected.type]: () => false,
});

const error = createReducer('', {
  [getCountries.pending.type]: () => '',
  [getCountries.rejected.type]: (_, { payload }) => payload,
});

export const countriesReducer = combineReducers({
  countries,
  error,
  loading,
});
