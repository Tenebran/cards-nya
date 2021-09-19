import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from '../pages/Auth/Login/Login';
import { CheckEmail } from '../pages/Auth/LostPassword/CheckEmail/CheckEmail';
import { LostPassword } from '../pages/Auth/LostPassword/LostPassword';
import { NewPassword } from '../pages/Auth/NewPassword/NewPassword';
import { Registration } from '../pages/Auth/Registration/Registration';
import { PageNotFound } from '../pages/PageNotFound/PageNotFound';
import { Profile } from '../pages/Profile/Profile';
import { TestPage } from '../pages/TestPage/TestPage';

export enum PATH {
  TEST = '/test',
  PROFILE = '/profile',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  RESET_PASSWORD = '/resetpass',
  NEW_PASS = '/newpass',
  CHECK_EMAIL = '/checkemail',
}

export const Routes = () => {
  return (
    <Switch>
      <Route exact path={'/'} render={() => <Redirect to={PATH.TEST} />} />
      <Route path={PATH.TEST} component={TestPage} />
      <Route path={PATH.PROFILE} component={Profile} />
      <Route path={PATH.LOGIN} component={Login} />
      <Route path={PATH.REGISTRATION} component={Registration} />
      <Route path={PATH.RESET_PASSWORD} component={LostPassword} />
      <Route path={PATH.NEW_PASS} component={NewPassword} />
      <Route path={PATH.NEW_PASS} component={NewPassword} />
      <Route path={PATH.CHECK_EMAIL} component={CheckEmail} />
      <Route component={PageNotFound} />
    </Switch>
  );
};
