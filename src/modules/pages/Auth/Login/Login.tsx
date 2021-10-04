import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Login.scss';
import {
  emailErrorMessage,
  validateEmail,
  validateEmailStyles,
} from '../../../common/validation/emailValidation';
import {
  passwordErrorMessage,
  validatePasswordStyles,
} from '../../../common/validation/passwordValidation';
import { NavLink, Redirect } from 'react-router-dom';
import { PATH } from '../../../routes/Routes';
import eye from '../../../common/icons/eye.png';
import closedEye from '../../../common/icons/closedEye.png';
import { loginTC } from '../../../redux/reducers/authReducer';
import { AppStoreType } from '../../../redux/store';
import SuperEditableSpan from '../../../components/SuperEditableSpan/SuperEditableSpan';
import SuperButton from '../../../components/SuperButton/SuperButton';
import { Loader } from '../../../components/Loader/Loader';
import { Preloader } from '../../../components/Preloader/Preloader';
import { Snackbar } from '@material-ui/core';
import Alert from '@mui/material/Alert';

export const Login = () => {
  const dispatch = useDispatch();
  const authMe = useSelector<AppStoreType, boolean>(state => state.user.authMe);
  const entityStatus = useSelector<AppStoreType, boolean>(state => state.user.entityStatus);
  const initialized = useSelector<AppStoreType, boolean>(state => state.user.initialized);
  const error = useSelector<AppStoreType, string>(state => state.user.errorMessage);
  const [openPassword, setOpenPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [value, setValue] = useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);

  const changeViewPassword = () => {
    setOpenPassword(!openPassword);
  };

  const emailTarget = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabledBtn(!(validateEmail(e.currentTarget.value) && password.length > 7));
  };

  const passwordTarget = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabledBtn(!(validateEmail(email) && e.currentTarget.value.length > 7));
    setPassword(e.currentTarget.value);
  };

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(loginTC(email, password, rememberMe));
    setEmail('');
    setPassword('');
    setRememberMe(false);
    setDisabledBtn(true);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (authMe) {
    return <Redirect to={PATH.PROFILE} />;
  }

  return (
    <div className="login">
      {initialized ? <Preloader /> : ''}
      <form>
        <div className="login__wrapper">
          <h2 className="forgot__title">It-Incubator</h2>
          <span className="forgot__subtitle">Sing In</span>
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
          <div>
            <div style={validatePasswordStyles(password)} className="login__password">
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
                type={openPassword ? 'passwordText' : 'Password'}
                valuepass={'Password'}
                onChange={passwordTarget}
              />
              {passwordErrorMessage(password)}

              <div className="login__remeberme__wrapper">
                <div className="login__remeberme">
                  <input onClick={() => setRememberMe(!rememberMe)} type="checkbox" />
                  <span>remember me</span>
                </div>

                <div className="login__forgotpass">
                  <NavLink to={PATH.RESET_PASSWORD} className="login__forgot">
                    Forgot Password
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <SuperButton
            name="Login"
            buttonWidth="266px"
            onClickHandler={loginHandler}
            entityStatus={entityStatus}
            disabledBtn={disabledBtn}
          />

          <div className="login__remember">Don’t have an account?</div>
          <NavLink to={PATH.REGISTRATION} className="login__tryloggin" href="#">
            Sign Up
          </NavLink>
        </div>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};
