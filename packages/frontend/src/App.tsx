import React from 'react';
import { SPARoutes } from '@common';
import { LoginPage, RegisterPage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicRoute } from './components/routes';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
