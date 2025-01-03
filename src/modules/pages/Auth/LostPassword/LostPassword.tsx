import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Preloader } from '../../../components/Preloader/Preloader';
import SuperButton from '../../../components/SuperButton/SuperButton';
import SuperEditableSpan from '../../../components/SuperEditableSpan/SuperEditableSpan';
import { RequestStatusType } from '../../../redux/reducers/appReducer';
import { forgotPasswordThunk } from '../../../redux/reducers/authReducer';
import { AppStoreType } from '../../../redux/store';
import { PATH } from '../../../routes/Routes';
import './LostPassword.scss';

export const LostPassword = () => {
  const statusSend = useSelector<AppStoreType, boolean>((state) => state.user.statusSend);
  const [email, setEmail] = useState<string>('');
  const isLoggedIn = useSelector<AppStoreType, boolean>((state) => state.user.authMe);
  const appStatus = useSelector<AppStoreType, RequestStatusType>((state) => state.app.status);
  const dispatch = useDispatch();

  if (statusSend) {
    return <Redirect to={PATH.CHECK_EMAIL} />;
  }

  if (isLoggedIn) {
    return <Redirect to={PATH.PROFILE} />;
  }

  const resetPasswordHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(forgotPasswordThunk(email));
  };

  return (
    <form className="forgot">
      <div className="forgot__wrapper">
        {appStatus === 'loading' ? <Preloader /> : ''}
        <h2 className="forgot__title">Cards-nya</h2>
        <span className="forgot__subtitle">Forgot your password?</span>
        <div>
          <SuperEditableSpan
            value={email}
            onChangeText={setEmail}
            spanProps={{ children: email ? undefined : 'Email' }}
            inputName="Email"
            type={'email'}
          />
        </div>
        <div className="forgot__info">
          Enter your email address and we will send you further instructions
        </div>

        <SuperButton
          name="Send Instructions"
          buttonWidth="266px"
          onClickHandler={resetPasswordHandler}
          className="superButton__default"
        />

        <div className="forgot__remember">Did you remember your password?</div>
        <Link to={PATH.LOGIN} className="forgot__tryloggin">
          Try logging in
        </Link>
      </div>
    </form>
  );
};
