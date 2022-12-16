import { DashboardRoutes, SPARoutes } from '@common';
import {
  ActorsTabPage,
  CountriesTabPage,
  GenresTabPage,
  MoviesTabPage,
  WritersTabPage,
} from '@components';
import {
  HomePage,
  LoginPage,
  MovieCreatePage,
  MoviePage,
  MovieUpdatePage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
} from '@pages';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { DashBoardLayout } from './components/layouts';
import { PublicRoute } from './components/routes';

import { UserProvider } from './providers';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path={SPARoutes.HOME} element={<HomePage />} />
          <Route path={SPARoutes.PROFILE} element={<ProfilePage />} />
          <Route path={SPARoutes.MOVIE} element={<MoviePage />} />
          <Route path={SPARoutes.CREATE_MOVIE} element={<MovieCreatePage />} />
          <Route path={SPARoutes.UPDATE_MOVIE} element={<MovieUpdatePage />} />
          <Route path={SPARoutes.DASHBOARD} element={<DashBoardLayout />}>
            <Route index element={<Navigate to={DashboardRoutes.MOVIES} />} />
            <Route path={DashboardRoutes.ACTORS} element={<ActorsTabPage />} />
            <Route
              path={DashboardRoutes.WRITERS}
              element={<WritersTabPage />}
            />
            <Route
              path={DashboardRoutes.COUNTRIES}
              element={<CountriesTabPage />}
            />
            <Route path={DashboardRoutes.GENRES} element={<GenresTabPage />} />
            <Route path={DashboardRoutes.MOVIES} element={<MoviesTabPage />} />
          </Route>
          <Route
            path={SPARoutes.LOGIN}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path={SPARoutes.REGISTER}
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
