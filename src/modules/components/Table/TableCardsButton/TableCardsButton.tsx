import React from 'react';
import { Link } from 'react-router-dom';

export const TableCardsButton = (props: PropsType) => {
  return (
    <>
      {props.myCardsId === props.CardsPack.user_id ? (
        <>
          <button
            onClick={() => props.popUpOpenDeleteHandler(props.CardsPack._id)}
            className="table__button_delete"
          >
            Delete
          </button>

          <button
            className="table__button"
            onClick={() =>
              props.popUpOpenEditHandler(
                props.CardsPack._id,
                props.CardsPack.question,
                props.CardsPack.answer
              )
            }
          >
            Edit
          </button>
        </>
      ) : (
        ''
      )}
      <Link to={`/learn/${props.CardsPack.cardsPack_id}`} className="table__button">
        Learn
      </Link>
    </>
  );
};

type PropsType = {
  CardsPack: any;
  popUpOpenEditHandler: (id: string, question: string, answer: string) => void;
  popUpOpenDeleteHandler: (id: string) => void;
  myCardsId: string | undefined;
};
