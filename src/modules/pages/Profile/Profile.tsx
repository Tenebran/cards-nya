import React, { useCallback } from 'react';
import { Header } from '../../components/Header/Header';
import './Profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logOutTC } from '../../redux/reducers/authReducer';
import { Redirect } from 'react-router-dom';
import { PATH } from '../../routes/Routes';
import { AppStoreType } from '../../redux/store';
import { InitialStateProfileType } from '../../redux/reducers/profileReducer';
import { CardsPack } from '../CardsPack/CardsPack';

export const Profile = () => {
  const authMe = useSelector<AppStoreType, boolean>(state => state.user.authMe);
  const dispatch = useDispatch();
  const profile = useSelector<AppStoreType, InitialStateProfileType>(state => state.profile);

  const logOutHandler = useCallback(() => {
    dispatch(logOutTC());
  }, [dispatch]);

  if (!authMe) {
    return <Redirect to={PATH.LOGIN} />;
  }

  return (
    <>
      <Header active={'profile_active'} />
      <CardsPack profie={profile} logOutHandler={logOutHandler} />
    </>
  );
};
