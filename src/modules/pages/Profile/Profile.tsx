import React from 'react';
import { Header } from '../../components/Header/Header';
import './Profile.scss';

export const Profile = () => {
  return (
    <>
      <Header active={'profile_active'} />
      <div>
        <h1>Profile</h1>
      </div>
    </>
  );
};
