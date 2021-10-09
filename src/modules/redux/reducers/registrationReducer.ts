import { Dispatch } from 'redux';
import { authApi } from '../../api/authApi';
import { entityStatusAC, errorMessagesAC, setInitializedAC } from './authReducer';

const initState: InitStateType = {
  authoriseMe: false as const,
  entityStatus: false as const,
};
type InitStateType = {
  authoriseMe: boolean;
  entityStatus: boolean;
};

export const registrationReducer = (
  state: InitStateType = initState,
  action: ActionRegistrationType
) => {
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
      dispatch(errorMessagesAC(error));
    }
    dispatch(registrationAC(false));
  };

type registrationAT = ReturnType<typeof registrationAC>;
export type entityStatusAT = ReturnType<typeof entityStatusAC>;
export type ActionRegistrationType =
  | registrationAT
  | entityStatusAT
  | ReturnType<typeof setInitializedAC>
  | ReturnType<typeof errorMessagesAC>;
type ThunkDispatch = Dispatch<ActionRegistrationType>;
