import React from 'react';
import './InitializedLoader.scss';

export const InitializedLoader = () => {
  return (
    <div className="pencil__wrapper">
      <div className="pencil">
        <div className="pencil__ball-point"></div>
        <div className="pencil__cap"></div>
        <div className="pencil__cap-base"></div>
        <div className="pencil__middle"></div>
        <div className="pencil__eraser"></div>
      </div>
      <div className="line"></div>
      <h2 className="pencil__title">Page Loading...Please Wait</h2>
    </div>
  );
};
