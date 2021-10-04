import React from 'react';
import { PATH } from '../../routes/Routes';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import { PackIcon } from '../../common/IconComponents/PackIcon';
import { ProfileIcon } from '../../common/IconComponents/ProfileIcon';

type HeaderPropsType = {
  active: string;
};

export const Header = (props: HeaderPropsType) => {
  return (
    <header className={'header'}>
      <Link to={PATH.PROFILE} className="header__logo">
        It-incubator
      </Link>
      <div className="header__menu__wrapper">
        <NavLink
          to={PATH.PACK_LIST}
          className={props.active === 'pack_list_active' ? 'header__menu_active' : 'header__menu'}
        >
          <PackIcon />
          <div className="header__menu__title">Pack List</div>
        </NavLink>

        <NavLink
          to={PATH.PROFILE}
          className={props.active === 'profile_active' ? 'header__menu_active' : 'header__menu'}
        >
          <ProfileIcon />
          <div className="header__menu__title"> Profile</div>
        </NavLink>
      </div>
    </header>
  );
};
