import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'filepond-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import './index.scss';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { Loading } from './components/loading/Loading';
import history from './configs/history';
import { Login } from './pages/login/Login';
import { ChangePassword } from './pages/change-password/ChangePassword';
import { ForgotPassword } from './pages/forgot-password/ForgotPassword';
import { ResetPassword } from './pages/forgot-password/ResetPassword';
import { ResetPasswordSuccessfully } from './pages/forgot-password/ResetPasswordSuccessfully';

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route
        exact
        path="/change-password/:username"
        component={ChangePassword}
      />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route
        exact
        path="/forgot-password/reset-password/:username"
        component={ResetPassword}
      />
      <Route
        exact
        path="/forgot-password/reset-password-successfully"
        component={ResetPasswordSuccessfully}
      />
      <Route path="*" component={App} />
    </Switch>
    <Loading />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
