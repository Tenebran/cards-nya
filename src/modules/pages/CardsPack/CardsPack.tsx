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
  packCardsCountSettings,
  seacrhPacksNameAC,
  updatePackTC,
} from '../../redux/reducers/cardsPacksReducers';
import { AppStoreType } from '../../redux/store';
import { Header } from '../../components/Header/Header';
import './CardsPack.scss';
import { Table } from '../../components/Table/Table';
import { InitialStateProfileType } from '../../redux/reducers/profileReducer';
import { CardsShow } from './CardsShow/CardsShow';
import { ProfileInfo } from '../Profile/ProfileInfo/ProfileInfo';
import { CardsPackSearch } from './CardsPackSearch/CardsPackSearch';
import SuperButton from '../../components/SuperButton/SuperButton';
import { Redirect } from 'react-router-dom';
import { PATH } from '../../routes/Routes';
import { Preloader } from '../../components/Preloader/Preloader';
import { RequestStatusType } from '../../redux/reducers/appReducer';

const tableTitle = {
  table1: 'Name',
  table2: 'Cards',
  table3: 'Last Updated',
  table4: 'Created by',
  table5: 'Cards',
  table6: 'Actions',
};

export const CardsPack = (props: PropsType) => {
  const [inputValue, setInputalue] = useState<string>('');
  const [selectPage, setSelectPage] = useState<number>(6);
  const appStatus = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);

  const dispatch = useDispatch();
  const CardsPack = useSelector<AppStoreType, Array<cardPacksType>>(
    state => state.cardsPack.cardsPack
  );
  const currentPage = useSelector<AppStoreType, number>(
    state => state.cardsPack.cardPacksTotalCount
  );

  const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.user.authMe);
  const maxRangeCount = useSelector<AppStoreType, number>(state => state.cardsPack.maxCardsCount);
  const minRangeCount = useSelector<AppStoreType, number>(state => state.cardsPack.minCardsCount);
  const page = useSelector<AppStoreType, number>(state => state.cardsPack.pageCount);
  const currentPageNumber = useSelector<AppStoreType, number>(state => state.cardsPack.page);
  const myCardsId = useSelector<AppStoreType, string>(state => state.profile._id);
  const userSelect = useSelector<AppStoreType, string>(state => state.cardsPack.userId);
  const [changeButton, setChangeButton] = useState<boolean>(userSelect ? true : false);

  useEffect(() => {
    dispatch(changePageCount(selectPage));
    dispatch(packCardsCountSettings(minRangeCount, maxRangeCount));
    dispatch(cardsPackTC());
  }, [dispatch, props.profie]);

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

  const addNewPackHandler = useCallback(
    (name: string) => {
      dispatch(addPackTC(name));
    },
    [dispatch]
  );

  const deletePackHandler = useCallback(
    (id: string) => {
      dispatch(deletePackTC(id));
    },
    [dispatch]
  );

  const updatePackHAndler = useCallback(
    (id: string, name: string) => {
      dispatch(updatePackTC(id, name));
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Redirect to={PATH.LOGIN} />;
  }

  return (
    <>
      {props.profie ? '' : <Header active={'pack_list_active'} />}
      <div className="cards-pack">
        <div className="cards-pack__wrapper">
          <div className="cards-pack__wrapper_schow">
            {props.profie ? (
              <>
                <ProfileInfo profie={props.profie} />
                <SuperButton
                  disabledBtn={appStatus === 'loading' ? true : false}
                  name="Logout"
                  buttonWidth="176px"
                  className="superButton__default"
                  onClickHandler={props.logOutHandler}
                />
              </>
            ) : (
              <CardsShow
                myPackHandler={changeToUserPack}
                allPackHandler={changeToAllPack}
                changeButton={changeButton}
                minRangeCount={minRangeCount}
                maxRangeCount={maxRangeCount}
              />
            )}
          </div>
          <div className="cards-pack__wrapper_table">
            <div className="cards-pack__title">Packs list</div>

            <CardsPackSearch
              inputValue={inputValue}
              onChangeCallback={onChangeCallback}
              onSearchClick={onSearchClick}
              addNewPackHandler={addNewPackHandler}
            />
            {appStatus === 'loading' ? (
              <Preloader />
            ) : (
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
                updatePackHAndler={updatePackHAndler}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

type PropsType = {
  profie?: InitialStateProfileType;
  logOutHandler?: () => void;
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
