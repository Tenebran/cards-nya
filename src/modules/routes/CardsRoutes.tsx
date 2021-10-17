import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Cards } from '../pages/CardsPack/Cards/Cards';
import { CardsLearn } from '../pages/CardsPack/CardsLearn/CardsLearn';
import { CardsPack } from '../pages/CardsPack/CardsPack';
import { Profile } from '../pages/Profile/Profile';
import { AppStoreType } from '../redux/store';
import { LoginRoutes } from './LoginRoutes';
import { PATH } from './Routes';

export const CardsRoutes = () => {
  const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.user.authMe);

  if (!isLoggedIn) {
    return <Route component={LoginRoutes} />;
  }

  return (
    <Switch>
      <Route exact path={'/'} render={() => <Redirect to={PATH.PROFILE} />} />
      <Route path={PATH.PROFILE} component={Profile} />
      <Route path={PATH.PACK_LIST} component={CardsPack} />
      <Route path={PATH.CARDS} component={Cards} />
      <Route path={PATH.CARDS_LEARN} component={CardsLearn} />
    </Switch>
  );
};
