import React from 'react';
import { SPARoutes } from '@common';
import { LoginPage, RegisterPage, NotFoundPage, HomePage } from '@pages';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute } from './components/routes';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route
          path={SPARoutes.LOGIN}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route path={SPARoutes.NOT_FOUND} element={<NotFoundPage />} />
        <Route
          path={SPARoutes.REGISTER}
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path={'*'} element={<Navigate to={SPARoutes.NOT_FOUND} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
