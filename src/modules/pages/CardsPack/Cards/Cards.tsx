import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { LeftArrowIcon } from '../../../common/IconComponents/LeftArrowIcon';
import { Header } from '../../../components/Header/Header';
import SuperButton from '../../../components/SuperButton/SuperButton';
import { Table } from '../../../components/Table/Table';
import {
  CardsSettingsType,
  cardsTC,
  changeCardsPage,
  getCardsPageCount,
  getUsersCards,
} from '../../../redux/reducers/cardsReducer';
import { AppStoreType } from '../../../redux/store';
import { PATH } from '../../../routes/Routes';
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
  const cardsCurrentPage = useSelector<AppStoreType, number>(state => state.cards.cardsTotalCount);
  const cardspage = useSelector<AppStoreType, number>(state => state.cards.pageCount);
  const [selectPage, setSelectPage] = useState<number>(8);
  const { id: userId } = useParams<{ id: string }>();
  const currentPageNumber = useSelector<AppStoreType, number>(state => state.cards.page);

  useEffect(() => {
    dispatch(getUsersCards(userId));
    dispatch(getCardsPageCount(selectPage));
    dispatch(cardsTC());
  }, [dispatch, userId]);

  const handleChange = useCallback(
    (event: object, value: number) => {
      dispatch(changeCardsPage(value));
      dispatch(cardsTC());
    },
    [dispatch]
  );

  console.log(currentPageNumber);

  const handleChangePage = useCallback((event: SelectChangeEvent) => {
    setSelectPage(parseInt(event.target.value));
    dispatch(getCardsPageCount(parseInt(event.target.value)));
    dispatch(cardsTC());
  }, []);

  const deletePackHandler = useCallback((id: string) => {}, [dispatch]);

  return (
    <>
      <Header active={'pack_list_active'} />
      <div className="cards-pack">
        <div className="cards-pack__wrapper">
          <div className="cards-pack__wrapper_table">
            <Link to={PATH.PACK_LIST} className="card__wrapper">
              <LeftArrowIcon />
              <div className="card__wrapper__title">Pack</div>
            </Link>
            <div className="cards-pack__search">
              <input placeholder="Search..." className="cards-pack__search__input" />
              <SuperButton name="Add new pack" buttonWidth="266px" />
            </div>

            <Table
              CardsPack={cards}
              tableTitle={tableTitle}
              currentPage={cardsCurrentPage}
              page={cardspage}
              currentPageNumber={currentPageNumber}
              handleChange={handleChange}
              selectPage={selectPage}
              handleChangePage={handleChangePage}
              deletePackHandler={deletePackHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};
