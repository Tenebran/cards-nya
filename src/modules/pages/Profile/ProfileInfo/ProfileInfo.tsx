import React, { useEffect, useState } from 'react';
import { InitialStateProfileType } from '../../../redux/reducers/profileReducer';
import './ProfileInfo.scss';
import userNoAvatar from '../../../common/img/no-avatar.png';
import SuperButton from '../../../components/SuperButton/SuperButton';
import { ProfilePopUp } from '../ProfilePopUp/ProfilePopUp';
import { useDispatch, useSelector } from 'react-redux';
import { thunkUpdateUser } from '../../../redux/reducers/authReducer';
import { srtingLenghtCutter } from '../../../components/Table/TableBody/TableBody';
import { AppStoreType } from '../../../redux/store';
import { RequestStatusType } from '../../../redux/reducers/appReducer';

type PropsType = {
  profie: InitialStateProfileType;
};

const AddPopUp = {
  PopUpTitle: 'Add Cards',
  PopUpInput1: 'Add Question',
  PopUpInput2: 'Add Answer',
};

export const ProfileInfo = (props: PropsType) => {
  const [popUpAdd, setPopUpAdd] = useState<boolean>(false);
  const [profileName, setProfileName] = useState<string>(props.profie.name);
  const [profileAvatar, setProfileAvatar] = useState<string>(
    props.profie.avatar ? props.profie.avatar : ''
  );
  const appStatus = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);

  useEffect(() => {
    thunkUpdateUser(profileName, profileAvatar);
  }, [profileName, profileAvatar]);

  const dispatch = useDispatch();

  const onUpdateProfileHandler = () => {
    dispatch(thunkUpdateUser(profileName, profileAvatar));

    popUpAdd === false ? setPopUpAdd(true) : setPopUpAdd(false);
  };

  const popUpOpenHandler = () => {
    popUpAdd === false ? setPopUpAdd(true) : setPopUpAdd(false);
  };

  return (
    <div className="profileInfo">
      {popUpAdd && (
        <ProfilePopUp
          popUpOpenHandler={popUpOpenHandler}
          profileName={profileName}
          profileAvatar={profileAvatar}
          setProfileName={setProfileName}
          setProfileAvatar={setProfileAvatar}
          onUpdateProfileHandler={onUpdateProfileHandler}
          popUpNames={AddPopUp}
        />
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
        disabledBtn={appStatus === 'loading' ? true : false}
        name="Edit"
        buttonWidth="100px"
        className="superButton__purpe"
        onClickHandler={popUpOpenHandler}
      />
    </div>
  );
};
