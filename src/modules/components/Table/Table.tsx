import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { CardsType } from '../../pages/CardsPack/Cards/Cards';
import { cardPacksType } from '../../pages/CardsPack/CardsPack';
import './Table.scss';

export type TableTitleType = {
  table1: string;
  table2: string;
  table3: string;
  table4: string;
  table5: string;
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
};

export const Table = (props: FormPropsType) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>{props.tableTitle.table1}</th>
            <th>{props.tableTitle.table2}</th>
            <th>{props.tableTitle.table3}</th>
            <th>{props.tableTitle.table4}</th>
            <th>{props.tableTitle.table5}</th>
          </tr>
        </thead>

        {props.CardsPack.map(CardsPack => {
          return (
            <tbody key={CardsPack._id}>
              <tr>
                <td>{CardsPack.name}</td>
                <td>{CardsPack.cardsCount}</td>
                <td>{CardsPack.updated.substr(0, 10)}</td>
                <td>{CardsPack.user_name}</td>
                <td>
                  <Link to={`/cards/${CardsPack._id}`}>Learn</Link>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

      <div className="cards-pack__pagination">
        <Pagination
          count={Math.ceil(props.currentPage / props.page)}
          shape="rounded"
          page={props.currentPageNumber}
          onChange={props.handleChange}
          boundaryCount={2}
        />

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
    </>
  );
};
