import { instance } from './api';

export const cardsApi = {
  getCards(packId: string, currentPage: number, pageCount: number, searchCards: string) {
    return instance.get<GetCards>(
      `cards/card?cardsPack_id=${packId}&pageCount=${pageCount}&page=${currentPage}&cardAnswer=${searchCards}`
    );
  },
  postCards(cardsPack_id: string, question: string, answer: string) {
    return instance.post(`/cards/card/`, { card: { cardsPack_id, question, answer } });
  },
  deleteCards(id: string) {
    return instance.delete(`/cards/card?id=${id}`);
  },
  updateCards(card: UpdateCardsType) {
    return instance.put(`/cards/card/`, card);
  },
  updateCardGrade(card_id: string, grade: number) {
    return instance.put<UpdatedGradeResponseType>(`cards/grade`, {
      card_id,
      grade,
    });
  },
};

export type GetCards = {
  cards: [
    {
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
    }
  ];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  packUserId: string;
  page: number;
  pageCount: number;
  cardGrade: number;
};

export type GetCardsType = {
  cardsPack_id: string;
  page: number;
  pageCount: number;
};

export type PostCardsType = {
  cardsPack_id: string;
  question: string;
  answer: string;
};

export type UpdateCardsType = {
  card: { _id: string; question: string; answer: string };
};

export type UpdatedGradeResponseType = {
  updatedGrade: CardType;
};

export type CardType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  type: string;
  rating: number;
  updated: Date | string;
  more_id: string;
  created: Date | string;
};
