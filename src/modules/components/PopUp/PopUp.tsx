import React, { useState } from 'react';
import { PopUpCancelIcon } from '../../common/IconComponents/PopUpCancelIcon';
import SuperButton from '../SuperButton/SuperButton';
import SuperEditableSpan from '../SuperEditableSpan/SuperEditableSpan';
import SuperInput from '../SuperInput/SuperInput';
import './PopUp.scss';

export const PopUp = (props: PopUpType) => {
  const [value, setValue] = useState<any>(null);

  return (
    <div className="popup">
      <div className="popup__wrapper">
        <div className="popup_header">
          <span className="popup__title">
            {props.popUpType === 'delete' ? 'Delete Pack' : 'Add new pack'}
          </span>
          <PopUpCancelIcon className="popup__cancel-icon" />
        </div>
        <div className="popup__body">
          {props.popUpType === 'delete' ? (
            <span className="popup__info">
              Do you really want to remove{' '}
              <span className="popup__info_pack"> Pack Name - Name Pack?</span> <br /> All cards
              will be excluded from this course.
            </span>
          ) : (
            <SuperEditableSpan
              value=""
              valuepass="Name Pack"
              inputName="Name Pack"
              spanProps={{ children: value ? undefined : 'Name pack' }}
              type={'text'}
            />
          )}
        </div>
        {props.popUpType === 'delete' ? (
          <div className="popup__button-wrapper">
            <SuperButton name="Cancel" buttonWidth="126px" className="superButton__default" />
            <SuperButton name="Delete" buttonWidth="126px" className="superButton__default" />
          </div>
        ) : (
          <div className="popup__button-wrapper">
            <SuperButton name="Cancel" buttonWidth="126px" className="superButton__default" />
            <SuperButton name="Save" buttonWidth="126px" className="superButton__default" />
          </div>
        )}
      </div>
    </div>
  );
};

type PopUpType = {
  popUpType: 'delete' | 'add';
};
