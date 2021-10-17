import { Login } from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CheckEmail } from '../pages/Auth/LostPassword/CheckEmail/CheckEmail';
import { CreateNewPassword } from '../pages/Auth/LostPassword/CreateNewPassword/CreateNewPassword';
import { LostPassword } from '../pages/Auth/LostPassword/LostPassword';
import { Registration } from '../pages/Auth/Registration/Registration';
import { AppStoreType } from '../redux/store';
import { CardsRoutes } from './CardsRoutes';
import { PATH } from './Routes';

export const LoginRoutes = () => {
  const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.user.authMe);

  if (isLoggedIn) {
    return <Route component={CardsRoutes} />;
  }
  return (
    <Switch>
      <Route exact path={'/'} render={() => <Redirect to={PATH.LOGIN} />} />
      <Route path={PATH.LOGIN} component={Login} />
      <Route path={PATH.REGISTRATION} component={Registration} />
      <Route path={PATH.RESET_PASSWORD} component={LostPassword} />
      <Route path={PATH.CHECK_EMAIL} component={CheckEmail} />
      <Route path={PATH.CREATE_NEW_PASSWORD} component={CreateNewPassword} />
    </Switch>
  );
};
