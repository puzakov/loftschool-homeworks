import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute, { loginPath } from '../PrivateRoute';
import LoginForm from '../LoginForm';
import AppRouter from '../AppRouter';
import { AuthProvider } from '../../context/Auth';
import { DataProvider } from '../../context/Data';

// Мы оборачиваем наши роуты в несколько провайдеров
// DataProvider - предоставляет обьект data с имейлами.
// AuthProvider - предоставляет метод авторизации authorize
//                и текущий статус isAuthorized
// BrowserRouter - провайдер react-router-dom.

export default () => (
  <DataProvider>
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          {/*
            Добавьте роуты /app и /login.
            Роут /app должен быть доступен 
            только авторизованному пользователю,
            используйте приватный роут.
            По умолчанию должен происходить редирект
            на страницу логина.

            /app будет использовать AppRouter в качестве вью
            /login будет использовать LoginForm
          */}
          <PrivateRoute path="/app" loginPath={loginPath} component={AppRouter} />
          <Route path={loginPath} component={LoginForm} />
          <Redirect to="/app" />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  </DataProvider>
);
