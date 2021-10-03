import { resolve } from 'dns';
import { Dispatch } from 'redux';
import { cardsApi } from '../../api/cardsApi';
import { CardsType } from '../../pages/CardsPack/Cards/Cards';
import { AppStoreType } from '../store';

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
};

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: ActionType
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

// export const getCardsSettingsAC = (
//   cardsTotalCount: number,
//   maxGrade: number,
//   minGrade: number,
//   page: number,
//   pageCount: number
// ) => {
//   return {
//     type: 'CARDS/GET_SETTINGS',
//     cardsTotalCount,
//     maxGrade,
//     minGrade,
//     page,
//     pageCount,
//   } as const;
// };

export const updateCardsAc = (
  cards: Array<CardsType>,
  cardsTotalCount: number,
  maxGrade: number,
  minGrade: number,
  page: number,
  pageCount: number
) => {
  return {
    type: 'CARDS/CARDS__UPDATE',
    cards,
    cardsTotalCount,
    maxGrade,
    minGrade,
    page,
    pageCount,
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

export const cardsTC = () => (dispatch: Dispatch, getState: () => AppStoreType) => {
  const appstate = getState().cards;
  console.log(appstate.page);
  cardsApi.getCards(appstate.packUserId, appstate.page, appstate.pageCount).then(resolve => {
    let res = resolve.data;
    dispatch(
      updateCardsAc(
        res.cards,
        res.cardsTotalCount,
        res.maxGrade,
        res.minGrade,
        res.page,
        res.pageCount
      )
    );
  });
};

export type CardsSettingsType = {
  cardsPack_id: string;
  page: number;
  pageCount: number;
};

type ActionType =
  | ReturnType<typeof getCardsAC>
  | ReturnType<typeof getUsersCards>
  | ReturnType<typeof getCardsPageCount>
  | ReturnType<typeof getTotalUserCount>
  | ReturnType<typeof changeCardsPage>
  | ReturnType<typeof updateCardsAc>;

export type InitialStateType = typeof initialState;
