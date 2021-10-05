import { Box, Slider } from '@mui/material';
import React, { useState } from 'react';
import './CardsShow.scss';

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 10;

export const CardsShow = (props: PropsType) => {
  const [value1, setValue1] = React.useState<number[]>([20, 37]);

  const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [value2, setValue2] = React.useState<number[]>([20, 37]);

  const handleChange2 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue as number[]);
    }
  };

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
    </>
  );
};

type PropsType = {
  myPackHandler: () => void;
  allPackHandler: () => void;
  changeButton: boolean;
};
