import React, { useEffect, useState } from 'react';
import { InitialStateProfileType } from '../../../redux/reducers/profileReducer';
import './ProfileInfo.scss';
import userNoAvatar from '../../../common/img/no-avatar.png';
import { srtingLenghtCutter } from '../../../components/Table/Table';
import SuperButton from '../../../components/SuperButton/SuperButton';
import { ProfilePopUp } from '../ProfilePopUp/ProfilePopUp';
import { useDispatch } from 'react-redux';
import { authMe, thunkUpdateUser } from '../../../redux/reducers/authReducer';

type PropsType = {
  profie: InitialStateProfileType;
};

export const ProfileInfo = (props: PropsType) => {
  const [popUp, setPopUp] = useState<boolean>(false);
  const [profileName, setProfileName] = useState<string>(props.profie.name);
  const [profileAvatar, setProfileAvatar] = useState<string>(
    props.profie.avatar ? props.profie.avatar : ''
  );

  const dispatch = useDispatch();

  const onUpdateProfileHandler = () => {
    dispatch(thunkUpdateUser(profileName, profileAvatar));

    popUp === false ? setPopUp(true) : setPopUp(false);
  };

  const popUpOpenHandler = () => {
    popUp === false ? setPopUp(true) : setPopUp(false);
  };

  console.log(props.profie.name);

  return (
    <div className="profileInfo">
      {popUp ? (
        <ProfilePopUp
          popUpOpenHandler={popUpOpenHandler}
          profileName={profileName}
          profileAvatar={profileAvatar}
          setProfileName={setProfileName}
          setProfileAvatar={setProfileAvatar}
          onUpdateProfileHandler={onUpdateProfileHandler}
        />
      ) : (
        ''
      )}
      <img
        src={profileAvatar ? props.profie.avatar : userNoAvatar}
        alt="avatar"
        className="profileInfo__avatar"
      />
      <span className="profileInfo__name">{srtingLenghtCutter(props.profie.name)}</span>
      <span className="profileInfo__cards">
        <span className="profileInfo__name_cards">Cards Pack:</span>
        {props.profie.publicCardPacksCount} things
      </span>
      <span className="profileInfo__email">{props.profie.email}</span>
      <SuperButton
        name="Edit"
        buttonWidth="100px"
        className="superButton__purpe"
        onClickHandler={popUpOpenHandler}
      />
    </div>
  );
};
