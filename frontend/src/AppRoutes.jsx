import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';

import Header from './components/Header';
import routes from './routes';

const LoginPage = lazy(() => import('./pages/login/LoginPage'));
const SignupPage = lazy(() => import('./pages/signup/SignupPage'));
const ChatPage = lazy(() => import('./pages/chat/HomePage'));
const ErrorPage = lazy(() => import('./pages/404/ErrorPage'));

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    token ? children : <Navigate to={routes.loginPage()} state={{ from: location }} />
  );
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path={routes.chatPage()} element={<Header />}>
        <Route
          index
          element={(
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          )}
        />
        <Route path={routes.loginPage()} element={<LoginPage />} />
        <Route path={routes.signupPage()} element={<SignupPage />} />
        <Route path={routes.randomPagePath()} element={<ErrorPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
