import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RequestStatusType } from '../../../redux/reducers/appReducer';
import { AppStoreType } from '../../../redux/store';

export const TablePagination = (props: PropsType) => {
  const appStatus = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);

  return (
    <div className="table__pagination">
      {props.currentPage === 0 ? (
        ''
      ) : (
        <Pagination
          disabled={appStatus === 'loading' ? true : false}
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
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <span className="cards-pack__select-title_end">Cards per Page</span>
      </div>
    </div>
  );
};

type PropsType = {
  currentPage: number;
  page: number;
  currentPageNumber: number;
  handleChange: (event: object, value: number) => void;
  selectPage: number;
  handleChangePage: (event: SelectChangeEvent) => void;
};
