import { Dispatch } from 'redux';
import { entityStatusAC, setInitializedAC } from './authReducer';
import { authApi } from '../../api/api';

const initState: InitStateType = {
  authoriseMe: false,
  entityStatus: false,
};
type InitStateType = {
  authoriseMe: boolean;
  entityStatus: boolean;
};

export const registrationReducer = (state: any = initState, action: actionType) => {
  switch (action.type) {
    case 'REGISTRATION_ME':
      return { ...state, authoriseMe: action.authoriseMe };
    case 'ENTITY-STATUS':
      return { ...state, entityStatus: true };
    default:
      return state;
  }
};

export const registrationAC = (authoriseMe: boolean) =>
  ({
    type: 'REGISTRATION_ME',
    authoriseMe,
  } as const);

export const registrationTC =
  (email: string, password: string) => async (dispatch: ThunkDispatch) => {
    dispatch(entityStatusAC());
    try {
      dispatch(setInitializedAC(true));
      await authApi.register(email, password);
      dispatch(registrationAC(true));
      dispatch(setInitializedAC(false));
    } catch (e: any) {
      const error = e.response
        ? e.response.data.error
        : e.message + ', more details in the console';
      alert(error);
    }
    dispatch(registrationAC(false));
  };

type registrationAT = ReturnType<typeof registrationAC>;
export type entityStatusAT = ReturnType<typeof entityStatusAC>;
type actionType = registrationAT | entityStatusAT | ReturnType<typeof setInitializedAC>;
type ThunkDispatch = Dispatch<actionType>;
