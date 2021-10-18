import React, { ChangeEvent, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {
  passwordErrorMessage,
  validatePasswordStyles,
} from '../../../../common/validation/passwordValidation';
import SuperButton from '../../../../components/SuperButton/SuperButton';
import SuperEditableSpan from '../../../../components/SuperEditableSpan/SuperEditableSpan';
import eye from '../../../../common/icons/eye.png';
import closedEye from '../../../../common/icons/closedEye.png';
import './CreateNewPassword.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPasswordThunk } from '../../../../redux/reducers/authReducer';
import { AppStoreType } from '../../../../redux/store';
import { PATH } from '../../../../routes/Routes';
import { Loader } from '../../../../components/Loader/Loader';

export const CreateNewPassword = () => {
  const initialized = useSelector<AppStoreType, boolean>(state => state.user.authMe);
  const [pass, setPass] = useState<string>('');
  const { token } = useParams<{ token: string }>();
  const [openPassword, setOpenPassword] = useState(false);
  const dispatch = useDispatch();

  const newPassSuccess = useSelector<AppStoreType, boolean>(state => state.user.newPassSuccess);
  const entityStatus = useSelector<AppStoreType, boolean>(state => state.user.entityStatus);
  const [disabledBtn, setDisabledBtn] = useState(true);

  const changeViewPassword = () => {
    setOpenPassword(!openPassword);
  };

  const passwordTarget = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabledBtn(e.currentTarget.value.length <= 7);
    setPass(e.currentTarget.value);
  };

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(createNewPasswordThunk(pass, token));
    setPass('');
    setDisabledBtn(true);
  };

  if (newPassSuccess) {
    return <Redirect to={PATH.LOGIN} />;
  }

  return (
    <form className="create">
      {!initialized ? (
        <Loader />
      ) : (
        <div className="create__wrapper">
          <h2 className="create__title">It-Incubator</h2>
          <span className="create__subtitle">Create new password</span>
          <div style={validatePasswordStyles(pass)} className="login__password">
            <img
              onClick={changeViewPassword}
              alt="password"
              src={openPassword ? eye : closedEye}
              className="login__password__eye"
            />
            <SuperEditableSpan
              value={pass}
              onChangeText={setPass}
              spanProps={{ children: pass ? undefined : 'Password' }}
              inputName="Password"
              type={openPassword ? 'passwordText' : 'Password'}
              valuepass={'Password'}
              onChange={passwordTarget}
            />
            {passwordErrorMessage(pass)}
          </div>
          <div className="create__info">
            Create new password and we will send you further instructions to email
          </div>

          <SuperButton
            name="Create new password"
            buttonWidth="266px"
            onClickHandler={onClickHandler}
            entityStatus={entityStatus}
            disabledBtn={disabledBtn}
            className="superButton__default"
          />
        </div>
      )}
    </form>
  );
};
