import React, { useState } from 'react';
import { MessageIcon } from '../../../../iconComponents/MessageIcon';
import './CheckEmail.scss';

export const CheckEmail = () => {
  return (
    <div className="Check">
      <div className="Check__wrapper">
        <h2 className="Check__title">It-Incubator</h2>
        <MessageIcon />
        <span className="Check__subtitle">Check Email?</span>
        <div className="Check__info">
          We’ve sent an Email with instructions to {`example@mail.com`}
        </div>
      </div>
    </div>
  );
};
