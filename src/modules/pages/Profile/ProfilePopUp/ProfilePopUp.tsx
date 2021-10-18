import React from 'react';
import { PopUpCancelIcon } from '../../../common/IconComponents/PopUpCancelIcon';
import SuperButton from '../../../components/SuperButton/SuperButton';
import SuperEditableSpan from '../../../components/SuperEditableSpan/SuperEditableSpan';

export const ProfilePopUp = (props: ProfilePopUpPropsType) => {
  return (
    <div className="popup" onClick={props.popUpOpenHandler}>
      <div className="popup__wrapper" onClick={e => e.stopPropagation()}>
        <div className="popup_header">
          <span className="popup__title">{props.popUpNames.PopUpTitle}</span>
          <PopUpCancelIcon className="popup__cancel-icon" onClickHandler={props.popUpOpenHandler} />
        </div>

        <div>
          <div className="popup__body">
            <span className="popup__title">{props.popUpNames.PopUpInput1}</span>
            <SuperEditableSpan
              value={props.profileName ? props.profileName : ''}
              onChangeText={props.setProfileName}
              valuepass={'Change Name'}
              inputName={'Change Name'}
              spanProps={{ children: props.profileName ? undefined : 'Change Name' }}
              type={'text'}
            />
          </div>
          <div className="popup__body">
            <span className="popup__title">{props.popUpNames.PopUpInput1}</span>
            <SuperEditableSpan
              value={props.profileAvatar ? props.profileAvatar : ''}
              onChangeText={props.setProfileAvatar}
              valuepass={'Change Avatar'}
              inputName={'Change Avatar'}
              spanProps={{ children: props.profileAvatar ? undefined : 'Change Avatar' }}
              type={'text'}
            />
          </div>
        </div>
        <div className="popup__button-wrapper">
          <SuperButton
            name="Save"
            buttonWidth="126px"
            className="superButton__default"
            onClickHandler={props.onUpdateProfileHandler}
          />
        </div>
      </div>
    </div>
  );
};

type ProfilePopUpPropsType = {
  popUpOpenHandler: () => void;
  profileName: string;
  profileAvatar: string;
  setProfileName: (name: string) => void;
  setProfileAvatar: (name: string) => void;
  onUpdateProfileHandler: () => void;
  popUpNames: popUpNamesType;
};

export type popUpNamesType = {
  PopUpTitle: string;
  PopUpInput1: string;
  PopUpInput2: string;
};
