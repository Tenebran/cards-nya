import React from 'react';
import { useSelector } from 'react-redux';
import { MessageIcon } from '../../../../iconComponents/MessageIcon';
import { AppStoreType } from '../../../../redux/store';
import './CheckEmail.scss';

export const CheckEmail = () => {
  const email = useSelector<AppStoreType, string>(state => state.user.userEmail);
  return (
    <div className="Check">
      <div className="Check__wrapper">
        <h2 className="Check__title">It-Incubator</h2>
        <MessageIcon />
        <span className="Check__subtitle">Check Email?</span>
        <div className="Check__info">
          We’ve sent an Email with instructions to {email !== '' ? email : `example@mail.com`}
        </div>
      </div>
    </div>
  );
};
