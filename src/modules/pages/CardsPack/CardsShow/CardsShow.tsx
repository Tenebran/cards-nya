import { Box } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cardsPackTC, packCardsCountSettings } from '../../../redux/reducers/cardsPacksReducers';
import Slider from '@mui/material/Slider';
import { AppStoreType } from '../../../redux/store';
import './CardsShow.scss';
import { RequestStatusType } from '../../../redux/reducers/appReducer';

const minDistance = 1;

export const CardsShow = (props: PropsType) => {
  const [rangeValue, setRangeValue] = React.useState<number[]>([
    props.minRangeCount,
    props.maxRangeCount,
  ]);
  const appStatus = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);

  const dispatch = useDispatch();
  const handleChange2 = useCallback(
    (event: Event, newValue: number | number[], activeThumb: number) => {
      if (!Array.isArray(newValue)) {
        return;
      }

      if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], 103 - minDistance);
          setRangeValue([clamped, clamped + minDistance]);
        } else {
          const clamped = Math.max(newValue[1], minDistance);
          setRangeValue([clamped - minDistance, clamped]);
        }
      } else {
        setRangeValue(newValue as number[]);
      }
    },
    []
  );

  const onSearchClick = useCallback(() => {
    dispatch(packCardsCountSettings(rangeValue[0], rangeValue[1]));
    dispatch(cardsPackTC());
  }, [dispatch, rangeValue]);

  return (
    <>
      <span className="cards-pack__show_title">Show packs cards</span>
      <div className="cards-pack__show_button_wrapper">
        <button
          disabled={appStatus === 'loading' ? true : false}
          className={
            props.changeButton ? 'cards-pack__show_button_purpe' : 'cards-pack__show_button_white'
          }
          onClick={props.myPackHandler}
        >
          My
        </button>
        <button
          disabled={appStatus === 'loading' ? true : false}
          className={
            !props.changeButton ? 'cards-pack__show_button_purpe' : 'cards-pack__show_button_white'
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
          value={rangeValue}
          onChange={handleChange2}
          valueLabelDisplay="on"
          disabled={appStatus === 'loading' ? true : false}
          disableSwap
        />
      </Box>
      <button
        disabled={appStatus === 'loading' ? true : false}
        onClick={onSearchClick}
        className="cards-pack__show_button_purpe"
      >
        Search
      </button>
    </>
  );
};

type PropsType = {
  myPackHandler: () => void;
  allPackHandler: () => void;
  changeButton: boolean;
  maxRangeCount: number;
  minRangeCount: number;
};
