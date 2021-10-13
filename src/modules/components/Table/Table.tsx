import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PackIcon } from '../../common/IconComponents/PackIcon';
import { PopUp } from '../PopUp/PopUp';
import './Table.scss';

export const srtingLenghtCutter = (value: string | number) => {
  if (value && typeof value === 'string') {
    return value.length > 10 ? value.substring(0, 15) + '...' : value;
  } else if (value >= 0 && typeof value === 'number') {
    return value;
  }
  return;
};

export const Table = (props: FormPropsType) => {
  const [popUp, setPopUp] = useState<boolean>(false);
  const [popUpEdit, setPopUpEdit] = useState<boolean>(false);
  const [packId, setPackId] = useState<string>('');
  const [packEditName, setPackEditName] = useState<string>('');

  const popUpOpenHandler = () => {
    popUp === false ? setPopUp(true) : setPopUp(false);
  };

  const popUpOpenEdit = () => {
    popUpEdit === false ? setPopUpEdit(true) : setPopUpEdit(false);
  };

  const popUpOpenDeleteHandler = (id: string) => {
    popUp === false ? setPopUp(true) : setPopUp(false);
    setPackId(id);
  };

  const popUpDeleteHandler = () => {
    console.log(packId);

    props.deletePackHandler(packId);
    popUp === false ? setPopUp(true) : setPopUp(false);
  };

  const popUpOpenEditHandler = (id: string, packEditName: string) => {
    setPackId(id);
    setPackEditName(packEditName);
    popUpEdit === false ? setPopUpEdit(true) : setPopUpEdit(false);
  };

  const popUpEditHandler = () => {
    if (props.updatePackHAndler) {
      props.updatePackHAndler(packId, packEditName);
    } else if (props.updateCardHandler) {
      props.updateCardHandler(packId);
    }
    popUpEdit === false ? setPopUpEdit(true) : setPopUpEdit(false);
  };

  return (
    <>
      {popUp ? (
        <PopUp
          popUpType="delete"
          popUpOpenHandler={popUpOpenHandler}
          popUpDeleteHandler={popUpDeleteHandler}
        />
      ) : (
        ''
      )}
      {popUpEdit ? (
        <PopUp
          popUpType="add"
          popUpOpenHandler={popUpOpenEdit}
          popUpTitle="Edit pack name"
          value={packEditName}
          onChangeText={setPackEditName}
          addNewCardsPackValue={popUpEditHandler}
        />
      ) : (
        ''
      )}

      <table className="table" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>{props.tableTitle.table1}</th>
            <th>{props.tableTitle.table2}</th>
            <th>{props.tableTitle.table3}</th>
            <th>{props.tableTitle.table4}</th>
            <th>{props.tableTitle.table5}</th>
            {props.tableTitle.table6 ? <th>{props.tableTitle.table6}</th> : ''}
          </tr>
        </thead>
        <tbody className="table__td">
          {props.CardsPack.map(CardsPack =>
            CardsPack.type === 'card' ? (
              <tr key={CardsPack._id} className="table__td">
                <td>{srtingLenghtCutter(CardsPack.question)}</td>
                <td>{srtingLenghtCutter(CardsPack.answer)}</td>
                <td>{srtingLenghtCutter(CardsPack.updated.substr(0, 10))}</td>
                <td>{srtingLenghtCutter(CardsPack.created)}</td>
                <td>
                  {props.myCardsId === CardsPack.user_id ? (
                    <>
                      <button
                        onClick={() => popUpOpenDeleteHandler(CardsPack._id)}
                        className="table__button_delete"
                      >
                        Delete
                      </button>

                      <button
                        className="table__button"
                        onClick={() => popUpOpenEditHandler(CardsPack._id, CardsPack.name)}
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    ''
                  )}
                  <Link to={`/learn/${CardsPack._id}`} className="table__button">
                    Learn
                  </Link>
                </td>
                <td>{/* <Link to={`/cards/${CardsPack._id}`}>Learn</Link> */}</td>
              </tr>
            ) : (
              <tr key={CardsPack._id} className="table__td">
                <td>{srtingLenghtCutter(CardsPack.name)}</td>
                <td>{srtingLenghtCutter(CardsPack.cardsCount)}</td>
                <td>{srtingLenghtCutter(CardsPack.updated.substr(0, 10))}</td>
                <td>{srtingLenghtCutter(CardsPack.user_name)}</td>
                {props.tableTitle.table6 ? (
                  <td>
                    <Link to={`/cards/${CardsPack._id}`}>
                      <PackIcon />
                    </Link>
                  </td>
                ) : (
                  ''
                )}

                {/* 'Cars Pack Button' */}
                <td>
                  {props.myCardsId === CardsPack.user_id ? (
                    <>
                      <button
                        onClick={() => popUpOpenDeleteHandler(CardsPack._id)}
                        className="table__button_delete"
                      >
                        Delete
                      </button>

                      <button
                        className="table__button"
                        onClick={() => popUpOpenEditHandler(CardsPack._id, CardsPack.name)}
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    ''
                  )}
                  <Link to={`/learn/${CardsPack._id}`} className="table__button">
                    Learn
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="table__pagination">
        {props.currentPage === 0 ? (
          ''
        ) : (
          <Pagination
            count={Math.ceil(props.currentPage / props.page)}
            shape="rounded"
            page={props.currentPageNumber}
            onChange={props.handleChange}
            boundaryCount={2}
            size="small"
          />
        )}
        <div>
          <span className="cards-pack__select-title">Show</span>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Page</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.selectPage.toString()}
              label="Page"
              onChange={props.handleChangePage}
              size={'small'}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
          <span className="cards-pack__select-title_end">Cards per Page</span>
        </div>
      </div>
    </>
  );
};

export type TableTitleType = {
  table1: string;
  table2: string;
  table3: string;
  table4: string;
  table5: string;
  table6?: string;
};

type FormPropsType = {
  CardsPack: Array<any>;
  tableTitle: TableTitleType;
  currentPageNumber: number;
  page: number;
  currentPage: number;
  selectPage: number;
  handleChangePage: (event: SelectChangeEvent) => void;
  handleChange: (event: object, value: number) => void;
  myCardsId?: string;
  deletePackHandler: (id: string) => void;
  updatePackHAndler?: (id: string, name: string) => void;
  cards?: boolean;
  updateCardHandler?: (id: string) => void;
};
