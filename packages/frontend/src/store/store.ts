import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { genreReducer } from './genres';
import { actorsReducer } from './actors/reducers';
import { directorReducer } from './directors';
import { countriesReducer } from './countries';
import { bookmarksReducer } from './bookmarks';
import { viewedReducer } from './viewed';
import { viewModalReducer } from './viewed-modal';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    genres: genreReducer,
    actors: actorsReducer,
    directors: directorReducer,
    countries: countriesReducer,
    bookmarks: bookmarksReducer,
    viewed: viewedReducer,
    viewedModal: viewModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
