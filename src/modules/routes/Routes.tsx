import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from '../pages/Auth/Login/Login';
import { CheckEmail } from '../pages/Auth/LostPassword/CheckEmail/CheckEmail';
import { CreateNewPassword } from '../pages/Auth/LostPassword/CreateNewPassword/CreateNewPassword';
import { LostPassword } from '../pages/Auth/LostPassword/LostPassword';
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
  CHECK_EMAIL = '/checkemail',
  CREATE_NEW_PASSWORD = '/newpassword/:token',
}

export const Routes = () => {
  return (
    <Switch>
      <Route exact path={'/'} render={() => <Redirect to={PATH.LOGIN} />} />
      <Route path={PATH.TEST} component={TestPage} />
      <Route path={PATH.PROFILE} component={Profile} />
      <Route path={PATH.LOGIN} component={Login} />
      <Route path={PATH.REGISTRATION} component={Registration} />
      <Route path={PATH.RESET_PASSWORD} component={LostPassword} />
      <Route path={PATH.CHECK_EMAIL} component={CheckEmail} />
      <Route path={PATH.CREATE_NEW_PASSWORD} component={CreateNewPassword} />
      <Route component={PageNotFound} />
    </Switch>
  );
};
