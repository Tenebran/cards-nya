import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { MessageIcon } from '../../../../iconComponents/MessageIcon';
import { AppStoreType } from '../../../../redux/store';
import { PATH } from '../../../../routes/Routes';
import './CheckEmail.scss';

export const CheckEmail = () => {
  const email = useSelector<AppStoreType, string>(state => state.user.userEmail);
  const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.user.authMe);

  if (email === '') {
    return <Redirect to={PATH.LOGIN} />;
  }

  if (isLoggedIn) {
    return <Redirect to={PATH.PROFILE} />;
  }

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
