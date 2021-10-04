import React, { useCallback, useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import './Profile.scss';
import SuperButton from '../../components/SuperButton/SuperButton';
import { useDispatch, useSelector } from 'react-redux';
import { logOutTC } from '../../redux/reducers/authReducer';
import { Button } from '../../common/Button/Button';
import { Redirect } from 'react-router-dom';
import { PATH } from '../../routes/Routes';
import { AppStoreType } from '../../redux/store';
import { Loader } from '../../components/Loader/Loader';
import { Preloader } from '../../components/Preloader/Preloader';

export const Profile = () => {
  const initialized = useSelector<AppStoreType, boolean>(state => state.user.initialized);
  const authMe = useSelector<AppStoreType, boolean>(state => state.user.authMe);
  const dispatch = useDispatch();

  const logOutHandler = useCallback(() => {
    dispatch(logOutTC());
  }, [dispatch]);

  if (!authMe) {
    return <Redirect to={PATH.LOGIN} />;
  }

  return (
    <>
      <Header active={'profile_active'} />
      <div>
        <h1>Profile</h1>
        {initialized && <Loader />}
        <Button title={'logout'} onClickHandler={logOutHandler} />
      </div>
    </>
  );
};
