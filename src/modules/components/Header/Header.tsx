import React from 'react';
import { PATH } from '../../routes/Routes';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  return (
    <header className={'header'}>
      <NavLink
        to={PATH.PROFILE}
        activeClassName={'header__button_active'}
        className={'header__button'}
      >
        Profile
      </NavLink>

      <NavLink
        to={PATH.LOGIN}
        activeClassName={'header__button_active'}
        className={'header__button'}
      >
        Login
      </NavLink>

      <NavLink
        to={PATH.REGISTRATION}
        activeClassName={'header__button_active'}
        className={'header__button'}
      >
        Sing Up
      </NavLink>
      <NavLink
        to={PATH.RESET_PASSWORD}
        activeClassName={'header__button_active'}
        className={'header__button'}
      >
        Forgot Password
      </NavLink>
      <NavLink
        to={PATH.CHECK_EMAIL}
        activeClassName={'header__button_active'}
        className={'header__button'}
      >
        Check Email
      </NavLink>
      <NavLink
        to={PATH.CREATE_NEW_PASSWORD}
        activeClassName={'header__button_active'}
        className={'header__button'}
      >
        Create New Passsword
      </NavLink>
    </header>
  );
};
