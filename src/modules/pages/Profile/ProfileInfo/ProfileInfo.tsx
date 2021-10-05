import React from 'react';
import { InitialStateProfileType } from '../../../redux/reducers/profileReducer';
import './ProfileInfo.scss';
import userNoAvatar from '../../../common/img/no-avatar.png';
import { srtingLenghtCutter } from '../../../components/Table/Table';

type PropsType = {
  profie: InitialStateProfileType;
};

export const ProfileInfo = (props: PropsType) => {
  return (
    <div className="profileInfo">
      <img
        src={props.profie.avatar ? props.profie.avatar : userNoAvatar}
        alt="avatar"
        className="profileInfo__avatar"
      />
      <span className="profileInfo__name">{srtingLenghtCutter(props.profie.name)}</span>
      <span className="profileInfo__cards">
        <span className="profileInfo__name_cards">Cards Pack:</span>
        {props.profie.publicCardPacksCount} things
      </span>
      <span className="profileInfo__email">{props.profie.email}</span>
    </div>
  );
};
