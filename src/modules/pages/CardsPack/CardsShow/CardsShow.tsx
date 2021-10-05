import React, { useState } from 'react';
import './CardsShow.scss';

export const CardsShow = (props: PropsType) => {
  return (
    <>
      <span className="cards-pack__show_title">Show packs cards</span>
      <div className="cards-pack__show_button_wrapper">
        <button
          className={
            props.changeButton ? 'cards-pack__show_button_white' : 'cards-pack__show_button_purpe'
          }
          onClick={props.myPackHandler}
        >
          My
        </button>
        <button
          className={
            !props.changeButton ? 'cards-pack__show_button_white' : 'cards-pack__show_button_purpe'
          }
          onClick={props.allPackHandler}
        >
          All
        </button>
      </div>
      <span className="cards-pack__show_title">Number of cards</span>
    </>
  );
};

type PropsType = {
  myPackHandler: () => void;
  allPackHandler: () => void;
  changeButton: boolean;
};
