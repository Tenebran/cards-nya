import { ThunkType } from '../store';
import { authMe } from './authReducer';

const initialState = {
  initialized: false as boolean,
  status: 'idle' as RequestStatusType,
  error: '' as string,
};

export const appReducer = (state = initialState, action: ActionAppType) => {
  switch (action.type) {
    case 'APP/SET_STATUS':
      return { ...state, status: action.status };
    case 'APP/SET_INITIALISATION':
      return { ...state, initialized: action.init };
    case 'APP/SET_CATCH_ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const setInitializedAC = (init: boolean) => {
  return { type: 'APP/SET_INITIALISATION', init } as const;
};

export const setAppStatusAC = (status: RequestStatusType) => {
  return { type: 'APP/SET_STATUS', status } as const;
};

export const setCatchError = (error: string) => {
  return { type: 'APP/SET_CATCH_ERROR', error } as const;
};

export const initializeAppThunk = (): ThunkType => dispatch => {
  const promise = dispatch(authMe());
  Promise.all([promise]).then(() => {
    dispatch(setInitializedAC(true));
  });
};

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ActionAppType =
  | ReturnType<typeof setInitializedAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setCatchError>;
