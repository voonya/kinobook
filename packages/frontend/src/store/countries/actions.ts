import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCountries } from 'src/services';

export enum CountriesActions {
  GET_ALL = 'GET_ALL_COUNTRIES',
}

const getCountries = createAsyncThunk(
  CountriesActions.GET_ALL,
  (_, { rejectWithValue }) =>
    getAllCountries()
      .then((data) => {
        console.log(data);

        if (data.error) {
          return rejectWithValue(data.error[0]);
        }

        return data.countries;
      })
      .catch((e) => {
        console.log(e);

        return rejectWithValue(e);
      }),
);

export { getCountries };
