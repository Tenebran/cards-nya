import React, { useState } from 'react';
import './PageNotFound.scss';
import notFoundPageImage from '../../common/icons/pngegg.png';
import { Redirect } from 'react-router-dom';
import { PATH } from '../../routes/Routes';

export const PageNotFound = () => {
  const [redirect, serRedirect] = useState<boolean>(false);

  if (redirect) {
    return <Redirect to={PATH.PROFILE} />;
  }

  const onClickImage = () => {
    serRedirect(true);
  };

  return (
    <div className="pageNotFound">
      <img
        className="pageNotFound__image"
        src={notFoundPageImage}
        alt="Not Found Page"
        onClick={onClickImage}
      />
    </div>
  );
};
