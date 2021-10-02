import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPackTC,
  cardsPackChangePage,
  cardsPackTC,
  changePageCount,
} from '../../redux/reducers/cardsPacksReducers';
import { AppStoreType } from '../../redux/store';
import { Header } from '../../components/Header/Header';
import SuperButton from '../../components/SuperButton/SuperButton';
import './CardsPack.scss';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Table } from '../../components/Table/Table';

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

const tableTitle = {
  table1: 'Name',
  table2: 'Cards',
  table3: 'Last Updated',
  table4: 'Created by',
  table5: 'Actions',
};

export const CardsPack = () => {
  const [inputValue, setInputalue] = useState<string>('');
  const [selectPage, setSelectPage] = useState<number>(5);
  const dispatch = useDispatch();
  const CardsPack = useSelector<AppStoreType, Array<cardPacksType>>(
    state => state.cardsPack.cardsPack
  );
  const currentPage = useSelector<AppStoreType, number>(
    state => state.cardsPack.cardPacksTotalCount
  );
  const page = useSelector<AppStoreType, number>(state => state.cardsPack.pageCount);
  const currentPageNumber = useSelector<AppStoreType, number>(state => state.cardsPack.page);

  useEffect(() => {
    dispatch(cardsPackTC());
    dispatch(changePageCount(selectPage));
  }, [dispatch]);

  // console.log(CardsPack);

  const handleChange = useCallback(
    (event: object, value: number) => {
      dispatch(cardsPackChangePage(value));
      dispatch(cardsPackTC());
    },
    [dispatch]
  );

  console.log(page);

  const onLearnClick = (id: string) => {
    console.log(`button cliked ${id}`);
    return <Redirect to={`/cards/${id}`} />;
  };

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    setInputalue(e.currentTarget.value);
  };

  const onSearchClick = () => {
    // dispatch(cardsPackChangeSettings({ ...cardsSettings, packName: inputValue }));
  };

  const handleChangePage = useCallback(
    (event: SelectChangeEvent) => {
      setSelectPage(parseInt(event.target.value));
      dispatch(changePageCount(parseInt(event.target.value)));
      dispatch(cardsPackTC());
    },
    [dispatch, page]
  );

  // const handleChangePage  =  (event: SelectChangeEvent) => {
  //   // console.log(parseInt(event.target.value));
  //   setSelectPage(parseInt(event.target.value));
  //   // dispatch(
  //   //   cardsPackChangeSettings({ ...cardsSettings, pageCount: parseInt(event.target.value) })
  //   // );
  // };

  const addNewPackHandler = useCallback(() => {
    const name = 'Hi';
    dispatch(addPackTC(name));
    dispatch(cardsPackTC());
  }, [dispatch]);

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
            />

            {/* <div className="cards-pack__pagination">
              <Pagination
                count={Math.ceil(currentPage / page)}
                shape="rounded"
                page={currentPageNumber}
                onChange={handleChange}
                boundaryCount={2}
              />

              <span className="cards-pack__select-title">Show</span>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Page</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectPage.toString()}
                  label="Page"
                  onChange={handleChangePage}
                  size={'small'}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
              <span className="cards-pack__select-title_end">Cards per Page</span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
