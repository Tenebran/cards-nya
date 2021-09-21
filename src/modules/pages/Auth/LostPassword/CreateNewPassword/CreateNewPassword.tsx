import React, { useState } from 'react';
import SuperButton from '../../../../components/SuperButton/SuperButton';
import SuperEditableSpan from '../../../../components/SuperEditableSpan/SuperEditableSpan';
import './CreateNewPassword.scss';

export const CreateNewPassword = () => {
  const [value, setValue] = useState<string>('');

  return (
    <div className="create">
      <div className="create__wrapper">
        <h2 className="create__title">It-Incubator</h2>
        <span className="create__subtitle">Create new password</span>
        <div>
          <SuperEditableSpan
            value={value}
            onChangeText={setValue}
            spanProps={{ children: value ? undefined : 'Password' }}
            inputName="Password"
            type={'password'}
          />
        </div>
        <div className="create__info">
          Create new password and we will send you further instructions to email
        </div>

        <SuperButton name="Create new password" buttonWidth="266px" />
      </div>
    </div>
  );
};
