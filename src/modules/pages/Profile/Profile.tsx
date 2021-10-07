import React, { useCallback, useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import './Profile.scss';
import SuperButton from '../../components/SuperButton/SuperButton';
import { useDispatch, useSelector } from 'react-redux';
import { logOutTC } from '../../redux/reducers/authReducer';
import { Button } from '../../common/Button/Button';
import { Link, Redirect } from 'react-router-dom';
import { PATH } from '../../routes/Routes';
import { AppStoreType } from '../../redux/store';
import { Loader } from '../../components/Loader/Loader';
import { Preloader } from '../../components/Preloader/Preloader';
import { InitialStateProfileType } from '../../redux/reducers/profileReducer';
import { LeftArrowIcon } from '../../common/IconComponents/LeftArrowIcon';
import { Table } from '@material-ui/core';
import { CardsPack } from '../CardsPack/CardsPack';
import { cardsPackTC, changeToMyCardsPackAC } from '../../redux/reducers/cardsPacksReducers';

export const Profile = () => {
  const initialized = useSelector<AppStoreType, boolean>(state => state.user.initialized);
  const authMe = useSelector<AppStoreType, boolean>(state => state.user.authMe);
  const dispatch = useDispatch();
  const profile = useSelector<AppStoreType, InitialStateProfileType>(state => state.profile);
  const myCardsId = useSelector<AppStoreType, string>(state => state.profile._id);

  const logOutHandler = useCallback(() => {
    dispatch(logOutTC());
  }, [dispatch]);

  if (!authMe) {
    return <Redirect to={PATH.LOGIN} />;
  }

  return (
    <>
      <Header active={'profile_active'} />
      {/* <CardsPack profie={profile} /> */}
    </>
  );
};
