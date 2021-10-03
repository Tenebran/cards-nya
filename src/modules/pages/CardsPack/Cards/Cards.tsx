import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Header } from '../../../components/Header/Header';
import SuperButton from '../../../components/SuperButton/SuperButton';
import { Table } from '../../../components/Table/Table';
import { CardsSettingsType, cardsTC } from '../../../redux/reducers/cardsReducer';
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

const tableTitle = {
  table1: 'Question',
  table2: 'Answer',
  table3: 'Last Updated',
  table4: 'Grade',
  table5: 'Actions',
};

export const Cards = () => {
  const dispatch = useDispatch();
  const cards = useSelector<AppStoreType, Array<CardsType>>(state => state.cards.cards);

  const { id } = useParams<{ id: string }>();
  const totalCountCards = useSelector<AppStoreType, number>(state => state.cards.cardsTotalCount);

  useEffect(() => {
    // dispatch(cardsChangeSettings({ ...cardsSettings, cardsPack_id: id }));

    dispatch(cardsTC());
  }, []);

  const handleChange = (event: object, value: number) => {
    // dispatch(cardsChangeSettings({ ...cardsSettings, page: value }));
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

            {/* <Table tableTitle={tableTitle} CardsPack={cards}  currentPage={}/> */}

            <table className="table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Last Updated</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cards.map(card => {
                  return (
                    <tr key={card._id}>
                      <td>{card.question}</td>
                      <td>{card.answer}</td>
                      <td>{card.updated.substr(0, 10)}</td>
                      <td>
                        <button>Delete</button>
                      </td>
                      <td>
                        <button>Delete </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              // count={Math.ceil(totalCountCards / cardsSettings.pageCount)}
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
