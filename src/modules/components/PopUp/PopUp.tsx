import React, { useState } from 'react';
import { PopUpCancelIcon } from '../../common/IconComponents/PopUpCancelIcon';
import SuperButton from '../SuperButton/SuperButton';
import SuperEditableSpan from '../SuperEditableSpan/SuperEditableSpan';
import SuperInput from '../SuperInput/SuperInput';
import './PopUp.scss';

export const PopUp = (props: PopUpType) => {
  return (
    <div className="popup" onClick={props.popUpOpenHandler}>
      <div className="popup__wrapper" onClick={e => e.stopPropagation()}>
        <div className="popup_header">
          <span className="popup__title">
            {props.popUpType === 'delete' ? 'Delete Pack' : props.popUpTitle}
          </span>
          <PopUpCancelIcon className="popup__cancel-icon" onClickHandler={props.popUpOpenHandler} />
        </div>
        <div className="popup__body">
          {props.popUpType === 'delete' ? (
            <span className="popup__info">
              Do you really want to remove
              <span className="popup__info_pack"> Pack Name - Name Pack?</span> <br /> All cards
              will be excluded from this course.
            </span>
          ) : (
            <SuperEditableSpan
              value={props.value ? props.value : ''}
              onChangeText={props.onChangeText}
              valuepass={props.popUpTitle}
              inputName={props.popUpTitle}
              spanProps={{ children: props.value ? undefined : props.popUpTitle }}
              type={'text'}
              width="113%"
            />
          )}
        </div>
        {props.popUpType === 'delete' ? (
          <div className="popup__button-wrapper">
            <SuperButton
              name="Cancel"
              buttonWidth="126px"
              className="superButton__purpe"
              onClickHandler={props.popUpOpenHandler}
            />
            <SuperButton
              name="Delete"
              buttonWidth="126px"
              className="superButton__delete"
              onClickHandler={props.popUpDeleteHandler}
            />
          </div>
        ) : (
          <div className="popup__button-wrapper">
            <SuperButton
              name="Cancel"
              buttonWidth="126px"
              className="superButton__purpe"
              onClickHandler={props.popUpOpenHandler}
            />
            <SuperButton
              name="Save"
              buttonWidth="126px"
              className="superButton__default"
              onClickHandler={props.addNewCardsPackValue}
            />
          </div>
        )}
      </div>
    </div>
  );
};

type PopUpType = {
  popUpType: 'delete' | 'add';
  value?: string;
  onChangeText?: (value: string) => void;
  addNewCardsPackValue?: () => void;
  popUpOpenHandler: () => void;
  popUpDeleteHandler?: () => void;
  popUpTitle?: string;
};
