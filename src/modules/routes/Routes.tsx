import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CardsPack } from '../pages/CardsPack/CardsPack';
import { Login } from '../pages/Auth/Login/Login';
import { CheckEmail } from '../pages/Auth/LostPassword/CheckEmail/CheckEmail';
import { CreateNewPassword } from '../pages/Auth/LostPassword/CreateNewPassword/CreateNewPassword';
import { LostPassword } from '../pages/Auth/LostPassword/LostPassword';
import { Registration } from '../pages/Auth/Registration/Registration';
import { PageNotFound } from '../pages/PageNotFound/PageNotFound';
import { Profile } from '../pages/Profile/Profile';
import { TestPage } from '../pages/TestPage/TestPage';
import { Cards } from '../pages/CardsPack/Cards/Cards';
import { useSelector } from 'react-redux';
import { AppStoreType } from '../redux/store';

export enum PATH {
  TEST = '/test',
  PROFILE = '/profile',
  PACK_LIST = '/packList',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  RESET_PASSWORD = '/resetpass',
  CHECK_EMAIL = '/checkemail',
  CREATE_NEW_PASSWORD = '/newpassword/:token',
  CARDS = '/cards/:id',
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
      <Route path={PATH.PACK_LIST} component={CardsPack} />
      <Route path={PATH.CARDS} component={Cards} />
      <Route component={PageNotFound} />
    </Switch>
  );
};
