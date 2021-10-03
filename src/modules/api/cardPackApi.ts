import { instance } from './api';

export const cardsPackApi = {
  getCardsPack(
    currentPage: number,
    pageCount: number,
    packName: string,
    userId: string | null,
    min: number,
    max: number
  ) {
    return instance.get<GetPackCards>(
      `cards/pack?pageCount=${pageCount}&page=${currentPage}&packName=${packName}&user_id=${userId}&min=${min}&max=${max}`
    );
  },
  postCardsPack(name: string) {
    return instance.post(`cards/pack`, { cardsPack: { name } });
  },
  deleteCardsPack(id: string) {
    return instance.delete(`/cards/pack/?id=${id}`);
  },
  updateCardsPack(cardsPack: UpdateCardsPackType) {
    return instance.put('/cards/pack', cardsPack);
  },
};

export type GetPackCards = {
  cardPacks: [
    {
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
    }
  ];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};

//

export type PostCardsPackType = {
  cardsPack: {
    name?: string;
  };
};

export type UpdateCardsPackType = {
  _id: string;
  name: string;
};
