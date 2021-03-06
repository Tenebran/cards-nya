import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { cardsApi } from '../../api/cardsApi';
import { CardsType } from '../../pages/CardsPack/Cards/Cards';
import { AppStoreType, ThunkType } from '../store';
import { setAppStatusAC, setCatchErrorAC } from './appReducer';

const initialState = {
  cards: [
    {
      answer: '',
      cardsPack_id: '',
      comments: '',
      created: '',
      grade: 0,
      more_id: '',
      question: '',
      rating: 0,
      shots: 0,
      type: '',
      updated: '',
      user_id: '',
      __v: 0,
      _id: '',
    },
  ],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  packUserId: '',
  page: 0,
  pageCount: 0,
  cardId: '',
  cardGrade: 0,
  searchCards: '',
};

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: ActionCardsType
): InitialStateType => {
  switch (action.type) {
    case 'CARDS/CARDS__UPDATE':
      return {
        ...state,
        cards: action.cards,
        cardsTotalCount: action.cardsTotalCount,
        maxGrade: action.maxGrade,
        minGrade: action.minGrade,
        page: action.page,
        pageCount: action.pageCount,
        packUserId: action.packUserId,
      };

    case 'CARDS/GET_CARDS':
      return {
        ...state,
        cards: action.cards,
      };
    case 'CARDS/GET_USERS_CARDS':
      return { ...state, packUserId: action.userId };

    case 'CARDS/PAGE_COUNT':
      return { ...state, pageCount: action.pageCount };
    case 'CARDS/GET_TOTAL_COUNT':
      return { ...state, cardsTotalCount: action.totalCount };
    case 'CARDS/CHANGE_PAGE':
      return { ...state, page: action.page };
    case 'CARDS/SET_CURRENT_CARD_ID':
      return { ...state, cardId: action.cardId };
    case 'CARDS/SET_CURRENT_CARD_GRADE':
      return {
        ...state,
        cardGrade: action.cardGrade,
      };
    case 'CARDS/SEARCH_CARDS':
      return {
        ...state,
        searchCards: action.CardsName,
      };
    default:
      return state;
  }
};

export const getCardsAC = (cards: Array<CardsType>) => {
  return {
    type: 'CARDS/GET_CARDS',
    cards,
  } as const;
};

export const setCurrentCardIdAC = (cardId: string) => {
  return {
    type: 'CARDS/SET_CURRENT_CARD_ID',
    cardId,
  } as const;
};

export const seacrhCardsNameAC = (CardsName: string) => {
  return { type: 'CARDS/SEARCH_CARDS', CardsName } as const;
};

export const updateCardsAc = (
  cards: Array<CardsType>,
  cardsTotalCount: number,
  maxGrade: number,
  minGrade: number,
  page: number,
  pageCount: number,
  packUserId: string
) => {
  return {
    type: 'CARDS/CARDS__UPDATE',
    cards,
    cardsTotalCount,
    maxGrade,
    minGrade,
    page,
    pageCount,
    packUserId,
  } as const;
};

export const getCardsPageCount = (pageCount: number) => {
  return { type: 'CARDS/PAGE_COUNT', pageCount } as const;
};

export const getTotalUserCount = (totalCount: number) => {
  return { type: 'CARDS/GET_TOTAL_COUNT', totalCount } as const;
};

export const getUsersCards = (userId: string) => {
  return { type: 'CARDS/GET_USERS_CARDS', userId } as const;
};

export const changeCardsPage = (page: number) => {
  return { type: 'CARDS/CHANGE_PAGE', page } as const;
};

export const setCurrentCardGradeAC = (cardGrade: number) => {
  return {
    type: 'CARDS/SET_CURRENT_CARD_GRADE',
    cardGrade,
  } as const;
};

export const cardsTC = () => (dispatch: Dispatch, getState: () => AppStoreType) => {
  dispatch(setAppStatusAC('loading'));
  const appstate = getState().cards;
  cardsApi
    .getCards(appstate.packUserId, appstate.page, appstate.pageCount, appstate.searchCards)
    .then(resolve => {
      let res = resolve.data;
      dispatch(
        updateCardsAc(
          res.cards,
          res.cardsTotalCount,
          res.maxGrade,
          res.minGrade,
          res.page,
          res.pageCount,
          res.packUserId
        )
      );
      dispatch(setAppStatusAC('succeeded'));
    })
    .catch((err: AxiosError) => {
      dispatch(setCatchErrorAC(err.message));
      dispatch(setAppStatusAC('succeeded'));
    });
};

export const getCardsTC =
  (packId: string): ThunkType =>
  (dispatch, getState: () => AppStoreType) => {
    dispatch(setAppStatusAC('loading'));
    const cards = getState().cards;
    const currentPage = cards.page;
    const pageCount = cards.pageCount;

    cardsApi
      .getCards(packId, currentPage, pageCount, cards.searchCards)
      .then(res => {
        dispatch(getCardsAC(res.data.cards));
        dispatch(getUsersCards(res.data.packUserId));
        dispatch(getTotalUserCount(res.data.cardsTotalCount));
        dispatch(setAppStatusAC('succeeded'));
      })
      .catch((err: AxiosError) => {
        dispatch(setCatchErrorAC(err.message));
        dispatch(setAppStatusAC('succeeded'));
      });
  };

export const updateCardGradeTC = (): ThunkType => (dispatch, getState: () => AppStoreType) => {
  dispatch(setAppStatusAC('loading'));
  const cardId = getState().cards.cardId;
  const grade = getState().cards.cardGrade;

  cardsApi
    .updateCardGrade(cardId, grade)
    .then(res => {
      dispatch(setCurrentCardGradeAC(res.data.updatedGrade.grade));
      dispatch(setAppStatusAC('succeeded'));
    })
    .catch((err: AxiosError) => {
      dispatch(setCatchErrorAC(err.message));
      dispatch(setAppStatusAC('succeeded'));
    });
};

export const addCard =
  (cardsPack_id: string, question: string, answer: string): ThunkType =>
  dispatch => {
    dispatch(setAppStatusAC('loading'));
    return cardsApi
      .postCards(cardsPack_id, question, answer)
      .then(res => {
        dispatch(cardsTC());
        dispatch(setAppStatusAC('succeeded'));
      })
      .catch((err: AxiosError) => {
        dispatch(setCatchErrorAC(err.message));
        dispatch(setAppStatusAC('succeeded'));
      });
  };

export const deleteCardTC =
  (id: string): ThunkType =>
  dispatch => {
    dispatch(setAppStatusAC('loading'));
    return cardsApi
      .deleteCards(id)
      .then(res => {
        dispatch(setAppStatusAC('succeeded'));
      })
      .catch((err: AxiosError) => {
        dispatch(setCatchErrorAC(err.message));
        dispatch(setAppStatusAC('succeeded'));
      });
  };

export const updateCardsTC =
  (_id: string, question: string, answer: string): ThunkType =>
  dispatch => {
    const card = {
      card: {
        _id: _id,
        question: question,
        answer: answer,
      },
    };
    dispatch(setAppStatusAC('loading'));
    return cardsApi
      .updateCards(card)
      .then(res => {
        dispatch(cardsTC());

        dispatch(setAppStatusAC('succeeded'));
      })
      .catch((err: AxiosError) => {
        dispatch(setCatchErrorAC(err.message));
        dispatch(setAppStatusAC('succeeded'));
      });
  };

export type CardsSettingsType = {
  cardsPack_id: string;
  page: number;
  pageCount: number;
};

export type ActionCardsType =
  | ReturnType<typeof getCardsAC>
  | ReturnType<typeof getUsersCards>
  | ReturnType<typeof getCardsPageCount>
  | ReturnType<typeof getTotalUserCount>
  | ReturnType<typeof changeCardsPage>
  | ReturnType<typeof updateCardsAc>
  | ReturnType<typeof setCurrentCardIdAC>
  | ReturnType<typeof setCurrentCardGradeAC>
  | ReturnType<typeof setCatchErrorAC>
  | ReturnType<typeof seacrhCardsNameAC>;

export type InitialStateType = typeof initialState;
