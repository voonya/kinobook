import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { genreReducer } from './genres';
import { actorsReducer } from './actors/reducers';
import { writerReducer } from './writers';
import { countriesReducer } from './countries';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    genres: genreReducer,
    actors: actorsReducer,
    writers: writerReducer,
    countries: countriesReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
