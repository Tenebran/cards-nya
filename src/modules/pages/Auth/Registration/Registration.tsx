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
import { Preloader } from '../../../common/preloader/Preloader';
import {
  confirmPasswordMessage,
  passwordErrorMessage,
} from '../../../common/validation/passwordValidation';
import { PATH } from '../../../routes/Routes';
import { Redirect } from 'react-router-dom';
import SuperEditableSpan from '../../../components/SuperEditableSpan/SuperEditableSpan';
import SuperButton from '../../../components/SuperButton/SuperButton';
import './Registration.scss';

export const Registration = () => {
  const dispatch = useDispatch();
  const authoriseMe = useSelector<any, boolean>(state => state.registration.authoriseMe);
  const entityStatus = useSelector<any, boolean>(state => state.registration.entityStatus);
  const [openPassword, setOpenPassword] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [value, setValue] = useState<string>('');

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

  const changeViewPassword = () => {
    setOpenPassword(!openPassword);
  };

  const registerHandler = () => {
    setInitialized(true);
    dispatch(registrationTC(email, password));
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setInitialized(false);
  };

  const clearAllInputs = () => {
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setDisabledBtn(true);
  };

  if (authoriseMe) {
    return <Redirect to={PATH.LOGIN} />;
  }
  return (
    <div className="login">
      {initialized && <Preloader />}
      <form>
        <div className="login__wrapper">
          <h2 className="forgot__title">It-Incubator</h2>
          <span className="forgot__subtitle">Sign Up</span>
          <div>
            <div style={validateEmailStyles(email)}>
              {/* <input
                onChange={emailTarget}
                value={email}
                type="text"
                placeholder="example@ddd.com"
                autoFocus
              /> */}
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
            {/* <p>Password:</p>
            <div style={validatePasswordStyles(password)}>
              <input
                onChange={passwordTarget}
                value={password}
                type={openPassword ? 'text' : 'password'}
                placeholder="****"
              />
              <img onClick={changeViewPassword} alt="" src={openPassword ? eye : closedEye} />
            </div>
            {passwordErrorMessage(password)} */}
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
              {/* <input
                onChange={passwordConfirmTarget}
                value={passwordConfirm}
                type={openPassword ? 'text' : 'password'}
                placeholder="****"
              />
              <img onClick={changeViewPassword} alt="" src={openPassword ? eye : closedEye} /> */}
            </div>
            {confirmPasswordMessage(password, passwordConfirm)}
          </div>
          <div className="registration__button-wrapper">
            <SuperButton
              name="Cancel"
              buttonWidth="124px"
              onClickHandler={clearAllInputs}
              color="purpe"
            />
            <SuperButton
              name="Register"
              buttonWidth="187px"
              onClickHandler={registerHandler}
              entityStatus={entityStatus}
              disabledBtn={disabledBtn}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
