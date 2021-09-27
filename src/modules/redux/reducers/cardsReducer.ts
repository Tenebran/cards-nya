import { Dispatch } from 'redux';
import { cardsApi } from '../../api/api';
import { CardsType } from '../../pages/CardsPack/Cards/Cards';
import { AppStoreType } from '../store';

const initialState = {
  cardsSettings: {
    cardsPack_id: '60a4e9e694de4b00046c1e0f',
    page: 1,
    pageCount: 5,
  },
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
    case 'CARDS/CARDS_CHANGE_SETTINGS':
      return {
        ...state,
        cardsSettings: action.cardsSettings,
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

export const cardsChangeSettings = (cardsSettings: CardsSettingsType) => {
  return { type: 'CARDS/CARDS_CHANGE_SETTINGS', cardsSettings } as const;
};

export const cardsTC = () => (dispatch: Dispatch, getState: () => AppStoreType) => {
  const appstate = getState();
  console.log(appstate);
  cardsApi.getCards(appstate.cards.cardsSettings).then(resp => {
    dispatch(
      getCardsAC(
        resp.data.cards,
        resp.data.cardsTotalCount,
        resp.data.maxGrade,
        resp.data.minGrade,
        resp.data.packUserId,
        resp.data.page,
        resp.data.pageCount
      )
    );
  });
};

export type CardsSettingsType = {
  cardsPack_id: string;
  page: number;
  pageCount: number;
};

type ActionType = ReturnType<typeof getCardsAC> | ReturnType<typeof cardsChangeSettings>;

export type InitialStateType = typeof initialState;
