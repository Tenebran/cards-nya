import { Box, Slider } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cardsPackTC, packCardsCountSettings } from '../../../redux/reducers/cardsPacksReducers';
import { AppStoreType } from '../../../redux/store';
import './CardsShow.scss';

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 1;

export const CardsShow = (props: PropsType) => {
  const maxRange = useSelector<AppStoreType, number>(state => state.cardsPack.maxCardsCount);
  const minRange = useSelector<AppStoreType, number>(state => state.cardsPack.minCardsCount);
  const [value2, setValue2] = React.useState<number[]>([minRange, maxRange]);
  const dispatch = useDispatch();
  const handleChange2 = useCallback(
    (event: Event, newValue: number | number[], activeThumb: number) => {
      if (!Array.isArray(newValue)) {
        return;
      }

      if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], 103 - minDistance);
          setValue2([clamped, clamped + minDistance]);
        } else {
          const clamped = Math.max(newValue[1], minDistance);
          setValue2([clamped - minDistance, clamped]);
        }
      } else {
        setValue2(newValue as number[]);
      }
    },
    []
  );

  const onSearchClick = useCallback(() => {
    console.log(value2[0], value2[1]);
    dispatch(packCardsCountSettings(value2[0], value2[1]));
    dispatch(cardsPackTC());
  }, [dispatch, value2]);

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
      <Box sx={{ width: '80%' }}>
        <Slider
          getAriaLabel={() => 'Minimum distance shift'}
          value={value2}
          onChange={handleChange2}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
        />
      </Box>
      <button onClick={onSearchClick}>search</button>
    </>
  );
};

type PropsType = {
  myPackHandler: () => void;
  allPackHandler: () => void;
  changeButton: boolean;
};
