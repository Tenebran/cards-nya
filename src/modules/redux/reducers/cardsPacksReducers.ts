import { Dispatch } from 'redux';
import { cardsPackApi } from '../../api/cardPackApi';
import { cardPacksType } from '../../pages/CardsPack/CardsPack';
import { AppStoreType } from '../store';
import { setInitializedAC } from './authReducer';

export const label = '';

const initialState = {
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
  searchPacks: '',
  userId: '',
  packsId: '',
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
    case 'CARDSPACK/CARDS_CHANGE_PAGE':
      return { ...state, page: action.page };

    case 'CARDSPACK/CHANGE_PAGE_COUNT':
      return { ...state, pageCount: action.pageCount };

    case 'CARDSPACK/SEARCH_PACK':
      return { ...state, searchPacks: action.PackName };

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

export const changePageCount = (pageCount: number) => {
  return { type: 'CARDSPACK/CHANGE_PAGE_COUNT', pageCount } as const;
};

export const cardsPackChangePage = (page: number) => {
  return { type: 'CARDSPACK/CARDS_CHANGE_PAGE', page } as const;
};

export const seacrhPacksNameAC = (PackName: string) => {
  return { type: 'CARDSPACK/SEARCH_PACK', PackName } as const;
};
export const cardsPackTC = () => (dispatch: Dispatch, getState: () => AppStoreType) => {
  const appState = getState().cardsPack;
  const currentPage = appState.page;
  const pageCount = appState.pageCount;
  const packName = appState.searchPacks;
  const min = appState.minCardsCount;
  const max = appState.maxCardsCount;
  dispatch(setInitializedAC(true));

  cardsPackApi.getCardsPack(currentPage, pageCount, packName, '', min, max).then(resp => {
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
    dispatch(setInitializedAC(false));
  });
};

export const addPackTC = (name: string) => () => {
  cardsPackApi.postCardsPack(name);
};

export type CardsSettingsType = {
  min: number;
  max: number;
  page: number;
  pageCount: number;
  packName: string;
};

type ActionType =
  | ReturnType<typeof updateCardsPackAc>
  | ReturnType<typeof cardsPackChangePage>
  | ReturnType<typeof changePageCount>
  | ReturnType<typeof seacrhPacksNameAC>;

type InitialStateType = typeof initialState;
