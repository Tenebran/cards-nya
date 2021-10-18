import { SelectChangeEvent } from '@mui/material';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom';
import { LeftArrowIcon } from '../../../common/IconComponents/LeftArrowIcon';
import { Header } from '../../../components/Header/Header';
import { Preloader } from '../../../components/Preloader/Preloader';
import SuperButton from '../../../components/SuperButton/SuperButton';
import { Table } from '../../../components/Table/Table';
import { RequestStatusType } from '../../../redux/reducers/appReducer';
import {
  addCard,
  cardsTC,
  changeCardsPage,
  deleteCardTC,
  getCardsPageCount,
  getUsersCards,
  seacrhCardsNameAC,
  updateCardsTC,
} from '../../../redux/reducers/cardsReducer';
import { AppStoreType } from '../../../redux/store';
import { PATH } from '../../../routes/Routes';
import { CardsPackSearch } from '../CardsPackSearch/CardsPackSearch';
import './Cards.scss';
import { CardsPopUp } from './CardsPopUp/CardsPopUp';

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

const AddPopUp = {
  PopUpTitle: 'Add Cards',
  PopUpInput1: 'Add Question',
  PopUpInput2: 'Add Answer',
  buttonName: 'Add',
};

const EditPopUp = {
  PopUpTitle: 'Edit Cards',
  PopUpInput1: 'Edit Question',
  PopUpInput2: 'Edit Answer',
  buttonName: 'Edit',
};

export const Cards = () => {
  const [inputValue, setInputalue] = useState<string>('');
  const dispatch = useDispatch();
  const cards = useSelector<AppStoreType, Array<CardsType>>(state => state.cards.cards);
  const cardsCurrentPage = useSelector<AppStoreType, number>(state => state.cards.cardsTotalCount);
  const cardspage = useSelector<AppStoreType, number>(state => state.cards.pageCount);
  const [selectPage, setSelectPage] = useState<number>(6);
  const { id: userId } = useParams<{ id: string }>();
  const myId2 = useSelector<AppStoreType, string>(state => state.cards.packUserId);
  const currentPageNumber = useSelector<AppStoreType, number>(state => state.cards.page);
  const myCardsId = useSelector<AppStoreType, string>(state => state.profile._id);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [editQuestion, seteditQuestion] = useState<string>('');
  const [editAnswer, setEditAnswer] = useState<string>('');
  const [editID, setEditID] = useState<string>('');
  const [popUpAdd, setPopUpAdd] = useState<boolean>(false);
  const [popUpEdit, setPopUpEdit] = useState<boolean>(false);
  const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.user.authMe);
  const appStatus = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);

  useEffect(() => {
    dispatch(getUsersCards(userId));
    dispatch(getCardsPageCount(selectPage));
    dispatch(cardsTC());
  }, [dispatch, userId, selectPage]);

  const handleChange = useCallback(
    (event: object, value: number) => {
      dispatch(getUsersCards(userId));
      dispatch(getCardsPageCount(selectPage));
      dispatch(changeCardsPage(value));
      dispatch(cardsTC());
    },
    [dispatch, selectPage, userId]
  );

  const handleChangePage = useCallback(
    (event: SelectChangeEvent) => {
      setSelectPage(parseInt(event.target.value));
      dispatch(getUsersCards(userId));
      dispatch(getCardsPageCount(selectPage));
      dispatch(getCardsPageCount(parseInt(event.target.value)));
      dispatch(cardsTC());
    },
    [dispatch, userId, selectPage]
  );

  const deletePackHandler = useCallback(
    (id: string) => {
      dispatch(deleteCardTC(id));
      dispatch(getUsersCards(userId));
      dispatch(getCardsPageCount(selectPage));
      dispatch(cardsTC());
    },
    [dispatch, userId, selectPage]
  );

  const updateCardHandler = useCallback(
    (id: string, question: string, answer: string) => {
      dispatch(updateCardsTC(id, question, answer));
      dispatch(getUsersCards(userId));
      dispatch(getCardsPageCount(selectPage));
      dispatch(cardsTC());
    },
    [dispatch, userId, selectPage]
  );

  const popUpOpenAdd = useCallback(() => {
    popUpAdd === false ? setPopUpAdd(true) : setPopUpAdd(false);
  }, [popUpAdd]);

  const popUpOpenEd = useCallback(() => {
    popUpEdit === false ? setPopUpEdit(true) : setPopUpEdit(false);
  }, [popUpEdit]);

  const popUpOpenEdit = (id: string, editQuestiond: string, editAnswer: string) => {
    setEditID(id);
    seteditQuestion(editQuestiond);
    setEditAnswer(editAnswer);
    popUpEdit === false ? setPopUpEdit(true) : setPopUpEdit(false);
  };

  const addNewCardsPackValue = useCallback(() => {
    dispatch(getUsersCards(userId));
    dispatch(getCardsPageCount(selectPage));
    dispatch(addCard(userId, question, answer));
    popUpOpenAdd();
    setQuestion('');
    setAnswer('');
  }, [dispatch, userId, question, answer, selectPage, popUpOpenAdd]);

  const editCardsPackValue = useCallback(() => {
    dispatch(getUsersCards(userId));
    dispatch(getCardsPageCount(selectPage));
    dispatch(updateCardsTC(editID, editQuestion, editAnswer));
    popUpOpenEd();
  }, [dispatch, popUpOpenEd, editAnswer, editQuestion, editID, selectPage, userId]);

  if (!isLoggedIn) {
    return <Redirect to={PATH.LOGIN} />;
  }
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    setInputalue(e.currentTarget.value);
  };

  const onSearchClick = () => {
    dispatch(seacrhCardsNameAC(inputValue));
    dispatch(getUsersCards(userId));
    dispatch(getCardsPageCount(selectPage));
    dispatch(cardsTC());
  };

  return (
    <>
      <Header active={'pack_list_active'} />

      <div className="cards-pack">
        {popUpAdd && (
          <CardsPopUp
            cardsQuestion={question}
            cardsAnswer={answer}
            setQuestion={setQuestion}
            setAnswer={setAnswer}
            onHandler={addNewCardsPackValue}
            popUpOpenHandler={popUpOpenAdd}
            popUpNames={AddPopUp}
          />
        )}

        {popUpEdit && (
          <CardsPopUp
            cardsQuestion={editQuestion}
            cardsAnswer={editAnswer}
            setQuestion={seteditQuestion}
            setAnswer={setEditAnswer}
            onHandler={editCardsPackValue}
            popUpOpenHandler={popUpOpenEd}
            popUpNames={EditPopUp}
          />
        )}
        <div className="cards-pack__wrapper">
          <div className="cards-pack__wrapper_table cards__wrapper_table">
            <Link to={PATH.PACK_LIST} className="card__wrapper">
              <LeftArrowIcon />
              <div className="card__wrapper__title">Pack</div>
            </Link>
            <div className="cards-pack__search">
              <div className="card__search-input">
                <CardsPackSearch
                  inputValue={inputValue}
                  onChangeCallback={onChangeCallback}
                  onSearchClick={onSearchClick}
                />
              </div>
              {myId2 === myCardsId ? (
                <SuperButton
                  name="Add new card"
                  buttonWidth="266px"
                  className="superButton__default"
                  onClickHandler={popUpOpenAdd}
                />
              ) : (
                ''
              )}
            </div>
            {appStatus === 'loading' ? (
              <Preloader />
            ) : (
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
                popUpOpenEdit={popUpOpenEdit}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
