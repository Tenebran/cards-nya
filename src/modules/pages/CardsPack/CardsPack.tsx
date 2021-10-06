import { SelectChangeEvent } from '@mui/material';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPackTC,
  cardsPackChangePage,
  cardsPackTC,
  changePageCount,
  changeToMyCardsPackAC,
  deletePackTC,
  seacrhPacksNameAC,
} from '../../redux/reducers/cardsPacksReducers';
import { AppStoreType } from '../../redux/store';
import { Header } from '../../components/Header/Header';
import SuperButton from '../../components/SuperButton/SuperButton';
import './CardsPack.scss';
import { Table } from '../../components/Table/Table';
import { Preloader } from '../../components/Preloader/Preloader';
import { InitialStateProfileType } from '../../redux/reducers/profileReducer';
import { CardsShow } from './CardsShow/CardsShow';
import { ProfileInfo } from '../Profile/ProfileInfo/ProfileInfo';

const tableTitle = {
  table1: 'Name',
  table2: 'Cards',
  table3: 'Last Updated',
  table4: 'Created by',
  table5: 'Actions',
};

export const CardsPack = (props: PropsType) => {
  const [inputValue, setInputalue] = useState<string>('');
  const [selectPage, setSelectPage] = useState<number>(8);
  const [changeButton, setChangeButton] = useState<boolean>(false);
  const dispatch = useDispatch();
  const CardsPack = useSelector<AppStoreType, Array<cardPacksType>>(
    state => state.cardsPack.cardsPack
  );
  const initialized = useSelector<AppStoreType, boolean>(state => state.user.initialized);
  const currentPage = useSelector<AppStoreType, number>(
    state => state.cardsPack.cardPacksTotalCount
  );
  const page = useSelector<AppStoreType, number>(state => state.cardsPack.pageCount);
  const currentPageNumber = useSelector<AppStoreType, number>(state => state.cardsPack.page);
  const myCardsId = useSelector<AppStoreType, string>(state => state.profile._id);

  useEffect(() => {
    dispatch(changePageCount(selectPage));
    dispatch(cardsPackTC());
  }, [dispatch]);

  const handleChange = useCallback(
    (event: object, value: number) => {
      dispatch(cardsPackChangePage(value));
      dispatch(cardsPackTC());
    },
    [dispatch]
  );

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    setInputalue(e.currentTarget.value);
  };

  const onSearchClick = () => {
    dispatch(seacrhPacksNameAC(inputValue));
    dispatch(cardsPackTC());
  };

  const handleChangePage = useCallback(
    (event: SelectChangeEvent) => {
      setSelectPage(parseInt(event.target.value));
      dispatch(changePageCount(parseInt(event.target.value)));
      dispatch(cardsPackTC());
    },
    [dispatch, page]
  );

  const changeToUserPack = useCallback(() => {
    dispatch(changeToMyCardsPackAC(myCardsId));
    dispatch(cardsPackTC());
    setChangeButton(true);
  }, [dispatch]);

  const changeToAllPack = useCallback(() => {
    dispatch(changeToMyCardsPackAC(''));
    dispatch(cardsPackTC());
    setChangeButton(false);
  }, [dispatch]);

  const addNewPackHandler = useCallback(() => {
    const name = 'Hello';
    dispatch(addPackTC(name));
    dispatch(cardsPackTC());
  }, [dispatch]);

  const deletePackHandler = useCallback(
    (id: string) => {
      dispatch(deletePackTC(id));
      dispatch(cardsPackTC());
    },
    [dispatch]
  );
  console.log(CardsPack);
  return (
    <>
      {props.profie ? '' : <Header active={'pack_list_active'} />}
      {initialized ? <Preloader /> : ''}
      <div className="cards-pack">
        <div className="cards-pack__wrapper">
          <div className="cards-pack__wrapper_schow">
            {props.profie ? (
              <ProfileInfo profie={props.profie} />
            ) : (
              <CardsShow
                myPackHandler={changeToUserPack}
                allPackHandler={changeToAllPack}
                changeButton={changeButton}
              />
            )}
          </div>
          <div className="cards-pack__wrapper_table">
            <div className="cards-pack__title">Packs list</div>
            <div className="cards-pack__search">
              <div className="cards-pack__input-wrapper">
                <input
                  placeholder="Search..."
                  className="cards-pack__search__input"
                  value={inputValue}
                  onChange={onChangeCallback}
                />
                <button className="cards-pack__search__button" onClick={onSearchClick}>
                  Search
                </button>
              </div>
              <SuperButton
                name="Add new pack"
                buttonWidth="266px"
                onClickHandler={addNewPackHandler}
              />
            </div>

            <Table
              CardsPack={CardsPack}
              tableTitle={tableTitle}
              currentPage={currentPage}
              page={page}
              currentPageNumber={currentPageNumber}
              handleChange={handleChange}
              selectPage={selectPage}
              handleChangePage={handleChangePage}
              myCardsId={myCardsId}
              deletePackHandler={deletePackHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

type PropsType = {
  profie?: InitialStateProfileType;
};

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
