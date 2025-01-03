import eye from '../../../common/icons/eye.png';
import closedEye from '../../../common/icons/closedEye.png';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  emailErrorMessage,
  validateEmail,
  validateEmailStyles,
} from '../../../common/validation/emailValidation';
import { registrationTC } from '../../../redux/reducers/registrationReducer';
import {
  confirmPasswordMessage,
  passwordErrorMessage,
} from '../../../common/validation/passwordValidation';
import { PATH } from '../../../routes/Routes';
import { Redirect } from 'react-router-dom';
import SuperEditableSpan from '../../../components/SuperEditableSpan/SuperEditableSpan';
import SuperButton from '../../../components/SuperButton/SuperButton';
import './Registration.scss';
import { AppStoreType } from '../../../redux/store';
import { Preloader } from '../../../components/Preloader/Preloader';
import { RequestStatusType } from '../../../redux/reducers/appReducer';

export const Registration = () => {
  const dispatch = useDispatch();
  const authoriseMe = useSelector<AppStoreType, boolean>((state) => state.registration.authoriseMe);
  const entityStatus = useSelector<AppStoreType, boolean>(
    (state) => state.registration.entityStatus
  );
  const [openPassword, setOpenPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [returnToLogin, setReturnToLogin] = useState(false);
  const value = '';
  const isLoggedIn = useSelector<AppStoreType, boolean>((state) => state.user.authMe);
  const appStatus = useSelector<AppStoreType, RequestStatusType>((state) => state.app.status);

  const emailTarget = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabledBtn(
      !(validateEmail(e.currentTarget.value) && password.length > 7 && passwordConfirm === password)
    );
    setEmail(e.currentTarget.value);
  };

  const passwordTarget = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabledBtn(
      !(
        validateEmail(email) &&
        e.currentTarget.value.length > 7 &&
        passwordConfirm === e.currentTarget.value
      )
    );
    setPassword(e.currentTarget.value);
  };
  const passwordConfirmTarget = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabledBtn(
      !(
        validateEmail(email) &&
        e.currentTarget.value.length > 7 &&
        password === e.currentTarget.value
      )
    );
    setPasswordConfirm(e.currentTarget.value);
  };

  const changeViewPassword = () => setOpenPassword(!openPassword);
  const returnToLoginHandler = () => setReturnToLogin(true);

  const registerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(registrationTC(email, password));
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  };

  if (authoriseMe || returnToLogin) {
    return <Redirect to={PATH.LOGIN} />;
  }

  if (isLoggedIn) {
    return <Redirect to={PATH.PROFILE} />;
  }

  return (
    <div className="login">
      <form>
        <div className="login__wrapper">
          {appStatus === 'loading' ? <Preloader /> : ''}
          <h2 className="forgot__title">Cards-nya</h2>
          <span className="forgot__subtitle">Sign Up</span>
          <div>
            <div style={validateEmailStyles(email)}>
              <SuperEditableSpan
                value={email}
                onChangeText={setEmail}
                spanProps={{ children: value ? undefined : 'Email' }}
                inputName="Email"
                type={'email'}
                onChange={emailTarget}
              />
            </div>
            {emailErrorMessage(email)}
          </div>
          <div className="login__password">
            <img
              onClick={changeViewPassword}
              alt="password"
              src={openPassword ? eye : closedEye}
              className="login__password__eye"
            />
            <SuperEditableSpan
              value={password}
              onChangeText={setPassword}
              spanProps={{ children: value ? undefined : 'Password' }}
              inputName="Password"
              type={openPassword ? 'text' : 'Password'}
              valuepass={password}
              onChange={passwordTarget}
            />
            {passwordErrorMessage(password)}
          </div>
          <div>
            <div className="login__password">
              <img
                onClick={changeViewPassword}
                alt="password"
                src={openPassword ? eye : closedEye}
                className="login__password__eye"
              />
              <SuperEditableSpan
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                spanProps={{ children: value ? undefined : 'Confirm password' }}
                inputName="Confirm password"
                type={openPassword ? 'text' : 'Password'}
                valuepass={passwordConfirm}
                onChange={passwordConfirmTarget}
              />
            </div>
            {confirmPasswordMessage(password, passwordConfirm)}
          </div>
          <div className="registration__button-wrapper">
            <SuperButton
              name="Cancel"
              buttonWidth="124px"
              onClickHandler={returnToLoginHandler}
              className="superButton__default"
              color="purpe"
            />
            <SuperButton
              name="Register"
              buttonWidth="187px"
              onClickHandler={registerHandler}
              entityStatus={entityStatus}
              disabledBtn={disabledBtn}
              className="superButton__default"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
