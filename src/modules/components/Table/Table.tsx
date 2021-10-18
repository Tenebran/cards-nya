import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { PopUp } from '../PopUp/PopUp';
import './Table.scss';
import { TableBody } from './TableBody/TableBody';
import { TableHead, TableTitleType } from './TableHead/TableHead';
import { TablePagination } from './TablePagination/TablePagination';

export const Table = (props: FormPropsType) => {
  const [popUp, setPopUp] = useState<boolean>(false);
  const [popUpEdit, setPopUpEdit] = useState<boolean>(false);
  const [packId, setPackId] = useState<string>('');
  const [packEditName, setPackEditName] = useState<string>('');
  const [answerEdit, setAnswerEdit] = useState<string | null>(null);

  const popUpOpenHandler = useCallback(() => {
    popUp === false ? setPopUp(true) : setPopUp(false);
  }, [popUp]);

  const popUpOpenEdit = useCallback(() => {
    popUpEdit === false ? setPopUpEdit(true) : setPopUpEdit(false);
  }, [popUpEdit]);

  const popUpOpenDeleteHandler = (id: string) => {
    popUp === false ? setPopUp(true) : setPopUp(false);
    setPackId(id);
  };

  const popUpDeleteHandler = () => {
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
    } else if (props.updateCardHandler && answerEdit !== null) {
      props.updateCardHandler(packId, packEditName, answerEdit);
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
          popUpTitle2="Edit anweser"
          value={packEditName}
          onChangeText={setPackEditName}
          onChangeText2={setAnswerEdit}
          addNewCardsPackValue={popUpEditHandler}
        />
      ) : (
        ''
      )}

      <table className="table" style={{ borderCollapse: 'collapse' }}>
        <TableHead tableTitle={props.tableTitle} />
        <TableBody
          CardsPack={props.CardsPack}
          popUpOpenDeleteHandler={popUpOpenDeleteHandler}
          popUpOpenEditHandler={popUpOpenEditHandler}
          myCardsId={props.myCardsId}
          tableTitle={props.tableTitle}
          popUpOpenEditCardsHandler={props.popUpOpenEdit}
        />
      </table>

      <TablePagination
        currentPage={props.currentPage}
        page={props.page}
        handleChange={props.handleChange}
        selectPage={props.selectPage}
        handleChangePage={props.handleChangePage}
        currentPageNumber={props.currentPageNumber}
      />
    </>
  );
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
  updateCardHandler?: (id: string, question: string, anweser: string) => void;
  popUpOpenEdit?: (id: string, editQuestion: string, editAnswer: string) => void;
};
