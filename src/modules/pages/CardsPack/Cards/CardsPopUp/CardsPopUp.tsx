import React from 'react';
import { PopUpCancelIcon } from '../../../../common/IconComponents/PopUpCancelIcon';
import SuperButton from '../../../../components/SuperButton/SuperButton';
import SuperEditableSpan from '../../../../components/SuperEditableSpan/SuperEditableSpan';

export const CardsPopUp = (props: CardsPopUpPropsType) => {
  return (
    <div className="popup" onClick={props.popUpOpenHandler}>
      <div className="popup__wrapper" onClick={e => e.stopPropagation()}>
        <div className="popup_header">
          <span className="popup__title">{props.popUpNames.PopUpTitle}</span>
          <PopUpCancelIcon className="popup__cancel-icon" onClickHandler={props.popUpOpenHandler} />
        </div>

        <div>
          <div className="popup__body">
            <span className="popup__title">{props.popUpNames.PopUpInput1}</span>
            <SuperEditableSpan
              value={props.cardsQuestion ? props.cardsQuestion : ''}
              onChangeText={props.setQuestion}
              valuepass={props.popUpNames.PopUpInput1}
              inputName={props.popUpNames.PopUpInput1}
              spanProps={{
                children: props.cardsQuestion ? undefined : props.popUpNames.PopUpInput1,
              }}
              type={'text'}
            />
          </div>
          <div className="popup__body">
            <span className="popup__title">{props.popUpNames.PopUpInput2}</span>
            <SuperEditableSpan
              value={props.cardsAnswer ? props.cardsAnswer : ''}
              onChangeText={props.setAnswer}
              valuepass={props.popUpNames.PopUpInput2}
              inputName={props.popUpNames.PopUpInput2}
              spanProps={{ children: props.cardsAnswer ? undefined : props.popUpNames.PopUpInput2 }}
              type={'text'}
            />
          </div>
        </div>
        <div className="popup__button-wrapper">
          <SuperButton
            name={props.popUpNames.buttonName}
            buttonWidth="126px"
            className="superButton__default"
            onClickHandler={props.onHandler}
          />
        </div>
      </div>
    </div>
  );
};

type CardsPopUpPropsType = {
  popUpOpenHandler: () => void;
  cardsQuestion: string;
  cardsAnswer: string;
  setQuestion: (name: string) => void;
  setAnswer: (name: string) => void;
  onHandler: () => void;
  popUpNames: popUpNamesType;
};

export type popUpNamesType = {
  PopUpTitle: string;
  PopUpInput1: string;
  PopUpInput2: string;
  buttonName: string;
};
