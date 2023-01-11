import { DashboardRoutes, SPARoutes } from '@common';
import {
  ActorsTabPage,
  CountriesTabPage,
  GenresTabPage,
  MoviesTabPage,
  DirectorsTabPage,
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
  CataloguePage,
  BookmarkPage,
  ViewedPage,
  RecommendationsPage,
} from '@pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { DashBoardLayout } from './components/layouts';
import { UserProvider } from './providers';
import { history } from './helpers';
import { BrowserRouter, ViewedModal } from '@components';

function App() {
  return (
    <UserProvider>
      <BrowserRouter history={history}>
        <Routes>
          <Route path={SPARoutes.HOME} element={<HomePage />} />
          <Route path={SPARoutes.PROFILE} element={<ProfilePage />} />
          <Route path={SPARoutes.MOVIE} element={<MoviePage />} />

          <Route path={SPARoutes.CREATE_MOVIE} element={<MovieCreatePage />} />
          <Route path={SPARoutes.UPDATE_MOVIE} element={<MovieUpdatePage />} />

          <Route path={SPARoutes.CATALOGUE} element={<CataloguePage />} />
          <Route path={SPARoutes.BOOKMARKS} element={<BookmarkPage />} />
          <Route path={SPARoutes.VIEWED} element={<ViewedPage />} />
          <Route
            path={SPARoutes.RECOMMENDATIONS}
            element={<RecommendationsPage />}
          />
          <Route path={SPARoutes.DASHBOARD} element={<DashBoardLayout />}>
            <Route index element={<Navigate to={DashboardRoutes.MOVIES} />} />
            <Route path={DashboardRoutes.ACTORS} element={<ActorsTabPage />} />
            <Route
              path={DashboardRoutes.DIRECTORS}
              element={<DirectorsTabPage />}
            />
            <Route
              path={DashboardRoutes.COUNTRIES}
              element={<CountriesTabPage />}
            />
            <Route path={DashboardRoutes.GENRES} element={<GenresTabPage />} />
            <Route path={DashboardRoutes.MOVIES} element={<MoviesTabPage />} />
          </Route>
          <Route path={SPARoutes.LOGIN} element={<LoginPage />} />
          <Route path={SPARoutes.REGISTER} element={<RegisterPage />} />
          <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ViewedModal />
    </UserProvider>
  );
}

export default App;
