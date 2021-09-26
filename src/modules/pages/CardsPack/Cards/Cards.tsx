import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cardsApi } from '../../../api/api';
import { Header } from '../../../components/Header/Header';
import { cardsTC } from '../../../redux/reducers/cardsReducer';
import { AppStoreType } from '../../../redux/store';
import './Cards.scss';

export type CardsType = {
  answer: string;
  cardsPack_id: string;
  comments: string;
  created: string;
  grade: number;
  more_id: string;
  question: string;
  rating: number;
  shots: number;
  type: string;
  updated: string;
  user_id: string;
  __v: number;
  _id: string;
};

export const Cards = () => {
  const [ax, setax] = useState<any>();
  const dispatch = useDispatch();
  const cards = useSelector<AppStoreType, Array<CardsType>>(state => state.cards.cards);

  const cardsSettings = {
    cardsPack_id: '60a4e9e694de4b00046c1e0f',
    min: 1,
    max: 999,
    page: 1,
    pageCount: 8,
  };

  useEffect(() => {
    // cardsApi.getCards(cardsSettings).then(resp => {
    //   dispatch(setax(resp.data.cards));
    // });
    // dispatch(cardsTC());
  }, []);

  console.log(ax);

  return (
    <>
      <Header />
      cards
    </>
  );
};
