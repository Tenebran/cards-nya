import React, { ChangeEvent, useState } from 'react';
import { PopUp } from '../../../components/PopUp/PopUp';
import SuperButton from '../../../components/SuperButton/SuperButton';

export const CardsPackSearch = (props: CardsPackPropsSearch) => {
  const [popUp, setPopUp] = useState<boolean>(false);
  const [newPackName, setNewPackName] = useState<string>('');

  const popUpOpenHandler = () => {
    popUp === false ? setPopUp(true) : setPopUp(false);
  };

  const addNewCardsPackValue = () => {
    console.log('newPacl');
    props.addNewPackHandler(newPackName);
    setPopUp(false);
    setNewPackName('');
  };

  return (
    <>
      {popUp ? (
        <PopUp
          popUpType="add"
          value={newPackName}
          onChangeText={setNewPackName}
          addNewCardsPackValue={addNewCardsPackValue}
          popUpOpenHandler={popUpOpenHandler}
          popUpTitle="Add new pack"
        />
      ) : (
        ''
      )}
      <div className="cards-pack__search">
        <div className="cards-pack__input-wrapper">
          <input
            placeholder="Search..."
            className="cards-pack__search__input"
            value={props.inputValue}
            onChange={props.onChangeCallback}
          />
          <button className="cards-pack__search__button" onClick={props.onSearchClick}>
            Search
          </button>
        </div>
        <SuperButton
          name="Add new pack"
          buttonWidth="266px"
          onClickHandler={popUpOpenHandler}
          className="superButton__default"
        />
      </div>
    </>
  );
};

type CardsPackPropsSearch = {
  inputValue: string;
  onChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
  addNewPackHandler: (name: string) => void;
  deleteHandler?: () => void;
};
