import { Rating } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { PackIcon } from '../../../common/IconComponents/PackIcon';
import { TableCardsButton } from '../TableCardsButton/TableCardsButton';
import { TableTitleType } from '../TableHead/TableHead';

export const srtingLenghtCutter = (value: string | number) => {
  if (value && typeof value === 'string') {
    return value.length > 10 ? value.substring(0, 15) + '...' : value;
  } else if (value >= 0 && typeof value === 'number') {
    return value;
  }
  return;
};

export const TableBody = (props: PropsType) => {
  return (
    <tbody className="table__td">
      {props.CardsPack.map(CardsPack =>
        CardsPack.type === 'card' ? (
          <tr key={CardsPack._id} className="table__td">
            <td>{srtingLenghtCutter(CardsPack.question)}</td>
            <td>{srtingLenghtCutter(CardsPack.answer)}</td>
            <td>{srtingLenghtCutter(CardsPack.updated.substr(0, 10))}</td>
            <td>{<Rating name="read-only" value={CardsPack.grade} readOnly />}</td>
            <td>
              {props.myCardsId === CardsPack.user_id && (
                <TableCardsButton
                  popUpOpenDeleteHandler={props.popUpOpenDeleteHandler}
                  CardsPack={CardsPack}
                  popUpOpenEditHandler={props.popUpOpenEditHandler}
                  myCardsId={props.myCardsId}
                />
              )}
            </td>
          </tr>
        ) : (
          <tr key={CardsPack._id} className="table__td">
            <td>{srtingLenghtCutter(CardsPack.name)}</td>
            <td>{srtingLenghtCutter(CardsPack.cardsCount)}</td>
            <td>{srtingLenghtCutter(CardsPack.updated.substr(0, 10))}</td>
            <td>{srtingLenghtCutter(CardsPack.user_name)}</td>
            {props.tableTitle.table6 && (
              <td>
                <Link to={`/cards/${CardsPack._id}`}>
                  <PackIcon />
                </Link>
              </td>
            )}

            {/* 'Cars Pack Button' */}
            <td>
              {props.myCardsId === CardsPack.user_id ? (
                <>
                  <button
                    onClick={() => props.popUpOpenDeleteHandler(CardsPack._id)}
                    className="table__button_delete"
                  >
                    Delete
                  </button>

                  <button
                    className="table__button"
                    onClick={() => props.popUpOpenEditHandler(CardsPack._id, CardsPack.name)}
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
  );
};

type PropsType = {
  CardsPack: Array<any>;
  myCardsId: string | undefined;
  popUpOpenEditHandler: (id: string, question: string, answer?: string) => void;
  popUpOpenDeleteHandler: (id: string) => void;
  tableTitle: TableTitleType;
};
