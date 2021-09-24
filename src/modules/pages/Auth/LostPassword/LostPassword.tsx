import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import SuperButton from '../../../components/SuperButton/SuperButton';
import SuperEditableSpan from '../../../components/SuperEditableSpan/SuperEditableSpan';
import { AppStoreType } from '../../../redux/store';
import { PATH } from '../../../routes/Routes';
import './LostPassword.scss';

export const LostPassword = () => {
  const statusSend = useSelector<AppStoreType, boolean>(state => state.user.statusSend);
  const [value, setValue] = useState<string>('');

  if (statusSend) {
    return <Redirect to={PATH.CHECK_EMAIL} />;
  }

  return (
    <div className="forgot">
      <div className="forgot__wrapper">
        <h2 className="forgot__title">It-Incubator</h2>
        <span className="forgot__subtitle">Forgot your password?</span>
        <div>
          <SuperEditableSpan
            value={value}
            onChangeText={setValue}
            spanProps={{ children: value ? undefined : 'Email' }}
            inputName="Email"
            type={'email'}
          />
        </div>
        <div className="forgot__info">
          Enter your email address and we will send you further instructions
        </div>

        <SuperButton name="Send Instructions" buttonWidth="266px" />

        <div className="forgot__remember">Did you remember your password?</div>
        <Link to={PATH.LOGIN} className="forgot__tryloggin">
          Try logging in
        </Link>
      </div>
    </div>
  );
};
