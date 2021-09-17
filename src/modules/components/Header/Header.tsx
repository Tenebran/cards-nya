import React from 'react';
import { PATH } from '../../routes/Routes';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  return (
    <header className={'header'}>
      <NavLink
        to={PATH.TEST}
        activeClassName={'header__button_active'}
        className={'header__button'}
      >
        Home
      </NavLink>

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
    </header>
  );
};
