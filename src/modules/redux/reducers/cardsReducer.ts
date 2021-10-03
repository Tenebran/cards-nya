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
    case 'CARDS/GET_CARDS':
      return {
        ...state,
        cards: action.cards,
        cardsTotalCount: action.cardsTotalCount,
        maxGrade: action.maxGrade,
        minGrade: action.minGrade,
        packUserId: action.packUserId,
        page: action.page,
        pageCount: action.pageCount,
      };

    default:
      return state;
  }
};

export const getCardsAC = (
  cards: Array<CardsType>,
  cardsTotalCount: number,
  maxGrade: number,
  minGrade: number,
  packUserId: string,
  page: number,
  pageCount: number
) => {
  return {
    type: 'CARDS/GET_CARDS',
    cards,
    cardsTotalCount,
    maxGrade,
    minGrade,
    packUserId,
    page,
    pageCount,
  } as const;
};

export const cardsTC = () => (dispatch: Dispatch, getState: () => AppStoreType) => {
  const appstate = getState().cards;
  console.log(appstate);
  cardsApi.getCards(appstate.packUserId, appstate.pageCount, appstate.page).then(resolve => {
    let res = resolve.data;
    getCardsAC(
      res.cards,
      res.cardsTotalCount,
      res.maxGrade,
      res.minGrade,
      res.packUserId,
      res.page,
      res.pageCount
    );
  });
};

export type CardsSettingsType = {
  cardsPack_id: string;
  page: number;
  pageCount: number;
};

type ActionType = ReturnType<typeof getCardsAC>;

export type InitialStateType = typeof initialState;
