import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllCountries,
  createCountry,
  deleteCountry,
  updateCountry,
} from 'src/services';

export enum CountriesActions {
  GET_ALL = 'GET_ALL_COUNTRIES',
  CREATE = 'CREATE_COUNTRIES',
  UPDATE = 'UPDATE_COUNTRIES',
  DELETE = 'DELETE_COUNTRIES',
}

interface ICreateCountry {
  id: string;
  name: string;
}
const dispatchGetCountries = createAsyncThunk(
  CountriesActions.GET_ALL,
  (_, { rejectWithValue }) =>
    getAllCountries()
      .then((data) => {
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

const dispatchCreateCountry = createAsyncThunk(
  CountriesActions.CREATE,
  (name: string, { rejectWithValue }) =>
    createCountry(name)
      .then((data) => {
        if (data.error) {
          return rejectWithValue(data.error[0]);
        }

        return data;
      })
      .catch((e) => {
        console.log(e);

        return rejectWithValue(e);
      }),
);

const dispatchUpdateCountry = createAsyncThunk(
  CountriesActions.UPDATE,
  ({ id, name }: ICreateCountry, { rejectWithValue }) =>
    updateCountry(id, name)
      .then((data) => {
        if (data.error) {
          return rejectWithValue(data.error[0]);
        }

        return data;
      })
      .catch((e) => {
        console.log(e);

        return rejectWithValue(e);
      }),
);

const dispatchDeleteCountry = createAsyncThunk(
  CountriesActions.DELETE,
  (id: string, { rejectWithValue }) =>
    deleteCountry(id)
      .then((data) => {
        if (data.error) {
          return rejectWithValue(data.error[0]);
        }

        return data;
      })
      .catch((e) => {
        console.log(e);

        return rejectWithValue(e);
      }),
);

export {
  dispatchGetCountries,
  dispatchCreateCountry,
  dispatchUpdateCountry,
  dispatchDeleteCountry,
};
