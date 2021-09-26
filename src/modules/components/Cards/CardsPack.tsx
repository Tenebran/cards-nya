import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cardsPackChangeSettings,
  cardsPackTC,
  CardsSettingsType,
} from '../../redux/reducers/cardsPacksReducers';
import { AppStoreType } from '../../redux/store';
import { Header } from '../Header/Header';
import SuperButton from '../SuperButton/SuperButton';
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

export const CardsPack = () => {
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
      <Header />
      <div className="cards-pack">
        <div className="cards-pack__wrapper">
          <div className="cards-pack__wrapper_schow">
            <span className="cards-pack__show_title">Show packs cards</span>
            <div className="cards-pack__show_button_wrapper">
              <button className="cards-pack__show_button_white">My</button>
              <button className="cards-pack__show_button_purpe">All</button>
            </div>
            <span className="cards-pack__show_title">Number of cards</span>
          </div>
          <div className="cards-pack__wrapper_table">
            <h1>Packs list</h1>
            <div className="cards-pack__search">
              <input placeholder="Search..." className="cards-pack__search__input" />
              <SuperButton name="Add new pack" buttonWidth="266px" />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Cards</th>
                  <th>Last Updated</th>
                  <th>Created by</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {CardsPack.map(CardsPack => {
                  return (
                    <tr key={CardsPack._id}>
                      <td>{CardsPack.name}</td>
                      <td>{CardsPack.cardsCount}</td>
                      <td>{CardsPack.updated}</td>
                      <td>{CardsPack.user_name}</td>
                      <td>
                        <button>Delete </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(totalCountCards / cardsSettings.pageCount)}
              shape="rounded"
              onChange={handleChange}
              boundaryCount={3}
            />
          </div>
        </div>
      </div>
    </>
  );
};
