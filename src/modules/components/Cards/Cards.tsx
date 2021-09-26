import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cardsPackApi } from '../../api/api';
import {
  cardsPackChangeSettings,
  cardsPackTC,
  CardsSettingsType,
  InitialStateType,
} from '../../redux/reducers/cardsPacksReducers';
import { AppStoreType } from '../../redux/store';
import { Header } from '../Header/Header';
import './Cards.scss';

export type cardPacksType = {
  cardsCount: number;
  created: string;
  grade: number;
  more_id: string;
  name: string;
  path: string;
  private: boolean;
  rating: number;
  shots: number;
  type: string;
  updated: string;
  user_id: string;
  user_name: string;
  __v: number;
  _id: string;
};

export const Cards = () => {
  const dispatch = useDispatch();
  const CardsPack = useSelector<AppStoreType, Array<cardPacksType>>(
    state => state.cardsPack.cardsPack
  );
  const cardsSettings = useSelector<AppStoreType, CardsSettingsType>(
    state => state.cardsPack.cardsSettings
  );
  const totalCountCards = useSelector<AppStoreType, number>(
    state => state.cardsPack.cardPacksTotalCount
  );
  const [page, setPage] = useState<number>();

  useEffect(() => {
    dispatch(cardsPackTC());
  }, [cardsSettings]);

  // console.log(page);

  // const handleChange = () => {

  // }
  // setPage(Math.ceil(totalCountCards / cardsSettings.pageCount));

  const handleChange = (event: object, value: number) => {
    dispatch(cardsPackChangeSettings({ ...cardsSettings, page: value }));
  };

  return (
    <>
      <div className="table">
        <div>
          <div>
            <div>Name</div>
            <div>Cards</div>
            <div>Last Updated</div>
            <div>Created by</div>
            <div>Actions</div>
          </div>
        </div>
        <div>
          {CardsPack.map(CardsPack => {
            return (
              <div key={CardsPack._id}>
                <div>{CardsPack.name}</div>
                <div>{CardsPack.cardsCount}</div>
                <div>{CardsPack.updated}</div>
                <div>{CardsPack.user_name}</div>
                <div>
                  <button>Delete </button>
                </div>
              </div>
            );
          })}
          {console.log(page)}
        </div>
      </div>
      <Pagination
        count={Math.ceil(totalCountCards / cardsSettings.pageCount)}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        defaultPage={5}
        boundaryCount={10}
      />
    </>
  );
};
