import React, { useState } from 'react';
import SuperButton from '../../../components/SuperButton/SuperButton';
import SuperEditableSpan from '../../../components/SuperEditableSpan/SuperEditableSpan';
import './LostPassword.scss';

export const LostPassword = () => {
  const [value, setValue] = useState<string>('');

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
        <a className="forgot__tryloggin" href="#">
          Try logging in
        </a>
      </div>
    </div>
  );
};
