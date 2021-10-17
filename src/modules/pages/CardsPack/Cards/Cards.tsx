import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { LeftArrowIcon } from '../../../common/IconComponents/LeftArrowIcon';
import { Header } from '../../../components/Header/Header';
import { PopUp } from '../../../components/PopUp/PopUp';
import SuperButton from '../../../components/SuperButton/SuperButton';
import { Table } from '../../../components/Table/Table';
import {
  // addCard,
  cardsTC,
  changeCardsPage,
  deleteCardTC,
  getCardsPageCount,
  getUsersCards,
  updateCardsTC,
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
  // const myId = useSelector<AppStoreType, string>(state => state.profile._id);
  const currentPageNumber = useSelector<AppStoreType, number>(state => state.cards.page);
  const myCardsId = useSelector<AppStoreType, string>(state => state.profile._id);
  // const [packId, setPackId] = useState<string>('');
  const [packEditName, setPackEditName] = useState<string>('');
  const [answerEdit, setAnswerEdit] = useState<string | null>(null);
  const [popUpEdit, setPopUpEdit] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUsersCards(userId));
    dispatch(getCardsPageCount(selectPage));
    dispatch(cardsTC());
  }, [dispatch, userId, selectPage]);

  const handleChange = useCallback(
    (event: object, value: number) => {
      dispatch(changeCardsPage(value));
      dispatch(cardsTC());
    },
    [dispatch]
  );

  const handleChangePage = useCallback(
    (event: SelectChangeEvent) => {
      setSelectPage(parseInt(event.target.value));
      dispatch(getCardsPageCount(parseInt(event.target.value)));
      dispatch(cardsTC());
    },
    [dispatch]
  );

  const deletePackHandler = useCallback(
    (id: string) => {
      dispatch(deleteCardTC(id));
    },
    [dispatch]
  );

  // const question = 'How Many?';
  // const answer = 'Very Very Many';
  // const addNewPackHandler = useCallback(() => {
  //   dispatch(addCard(userId, question, answer));
  // }, [dispatch]);

  const updateCardHandler = useCallback(
    (id: string, question: string, answer: string) => {
      dispatch(updateCardsTC(id, question, answer));
    },
    [dispatch]
  );

  // const popUpOpenEditHandler = useCallback(
  //   (id: string, packEditName: string, subtitleName?: string) => {
  //     setPackId(id);
  //     setPackEditName(packEditName);
  //     subtitleName && setAnswerEdit(subtitleName);
  //     popUpEdit === false ? setPopUpEdit(true) : setPopUpEdit(false);
  //   },
  //   [packId]
  // );

  const popUpOpenEdit = useCallback(() => {
    popUpEdit === false ? setPopUpEdit(true) : setPopUpEdit(false);
  }, [popUpEdit]);

  return (
    <>
      <Header active={'pack_list_active'} />

      <div className="cards-pack">
        {popUpEdit ? (
          <PopUp
            popUpType="add"
            popUpOpenHandler={popUpOpenEdit}
            popUpTitle="Edit pack name"
            popUpTitle2="Edit anweser"
            value={packEditName}
            value2={answerEdit}
            onChangeText={setPackEditName}
            onChangeText2={setAnswerEdit}
          />
        ) : (
          ''
        )}
        <div className="cards-pack__wrapper">
          <div className="cards__wrapper_table">
            <Link to={PATH.PACK_LIST} className="card__wrapper">
              <LeftArrowIcon />
              <div className="card__wrapper__title">Pack</div>
            </Link>
            <div className="cards-pack__search">
              <input placeholder="Search..." className="cards-pack__search__input" />

              {cards[0] && cards[0].user_id === myCardsId ? (
                <SuperButton
                  name="Add card"
                  buttonWidth="266px"
                  className="superButton__default"
                  onClickHandler={popUpOpenEdit}
                />
              ) : (
                ''
              )}
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
              myCardsId={myCardsId}
              updateCardHandler={updateCardHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};
