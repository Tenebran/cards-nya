import { Dispatch } from 'redux';
import { cardsPackApi } from '../../api/api';
import { cardPacksType } from '../../pages/CardsPack/CardsPack';
import { AppStoreType } from '../store';

export const label = '';

const initialState = {
  cardsSettings: {
    min: 1,
    max: 999,
    page: 1,
    pageCount: 5,
    packName: '',
  },
  cardsPack: [
    {
      cardsCount: 0,
      created: '',
      grade: 0,
      more_id: '',
      name: '',
      path: '',
      private: false,
      rating: 0,
      shots: 0,
      type: '',
      updated: '',
      user_id: '',
      user_name: '',
      __v: 0,
      _id: '',
    },
  ],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 0,
  pageCount: 0,
};

export const cardsPackReducer = (
  state: InitialStateType = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case 'CARDSPACK/CARDS_PACK_UPDATE':
      return {
        ...state,
        cardsPack: action.cardsPack,
        cardPacksTotalCount: action.cardPacksTotalCount,
        maxCardsCount: action.maxCardsCount,
        minCardsCount: action.minCardsCount,
        page: action.page,
        pageCount: action.pageCount,
      };

    case 'CARDSPACK/CARDS_CHANGE_SETTINGS':
      return { ...state, cardsSettings: action.cardsSettings };

    default:
      return state;
  }
};

export const updateCardsPackAc = (
  cardsPack: Array<cardPacksType>,
  pageCount: number,
  page: number,
  minCardsCount: number,
  maxCardsCount: number,
  cardPacksTotalCount: number
) => {
  return {
    type: 'CARDSPACK/CARDS_PACK_UPDATE',
    cardsPack,
    pageCount,
    page,
    minCardsCount,
    maxCardsCount,
    cardPacksTotalCount,
  } as const;
};

export const cardsPackChangeSettings = (cardsSettings: CardsSettingsType) => {
  return { type: 'CARDSPACK/CARDS_CHANGE_SETTINGS', cardsSettings } as const;
};

export const cardsPackTC = () => (dispatch: Dispatch, getState: () => AppStoreType) => {
  const appState = getState();
  cardsPackApi.getCardsPack(appState.cardsPack.cardsSettings).then(resp => {
    dispatch(
      updateCardsPackAc(
        resp.data.cardPacks,
        resp.data.pageCount,
        resp.data.page,
        resp.data.minCardsCount,
        resp.data.maxCardsCount,
        resp.data.cardPacksTotalCount
      )
    );
  });
};

export type CardsSettingsType = {
  min: number;
  max: number;
  page: number;
  pageCount: number;
  packName: string;
};

type ActionType = ReturnType<typeof updateCardsPackAc> | ReturnType<typeof cardsPackChangeSettings>;

type InitialStateType = typeof initialState;
