import { Dispatch } from 'redux';
import { authApi } from '../../api/authApi';
import { getProfileAC, InitialStateProfileType } from './profileReducer';

const initialState = {
  authMe: false,
  initialized: false,
  entityStatus: false,
  statusSend: false,
  userEmail: '',
  newPassSuccess: false,
  errorMessage: '',
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case 'AUTH/LOGIN': {
      return { ...state, authMe: action.authMe };
    }
    case 'AUTH/LOGOUT': {
      return { ...state };
    }
    case 'AUTH/SET_INITIALIZED':
      return {
        ...state,
        initialized: action.initialized,
      };
    case 'AUTH/FORGOT-PASSWORD':
      return { ...state, statusSend: true, userEmail: action.email };

    case 'AUTH/NEW-PASSWORD-SUCCESS':
      return { ...state, newPassSuccess: action.success };
    /* case 'AUTH/UPDATE-USER':
             return {...state, userData: action.userData};*/
    case 'AUTH/ERROR_MESSAGES':
      return { ...state, errorMessage: action.messages };
    default:
      return state;
  }
};
export const entityStatusAC = () =>
  ({
    type: 'ENTITY-STATUS',
  } as const);

export const logOutAC = (authMe: boolean) => {
  return { type: 'AUTH/LOGOUT', authMe } as const;
};

export const loginAC = (authMe: boolean) => {
  return { type: 'AUTH/LOGIN', authMe } as const;
};

export const updatedUserAc = (userData: Usertype) => {
  return { type: 'AUTH/UPDATE-USER', userData } as const;
};

export const setInitializedAC = (initialized: boolean) =>
  ({
    type: 'AUTH/SET_INITIALIZED',
    initialized,
  } as const);

export const forgotPasswordAc = (email: string) => {
  return { type: 'AUTH/FORGOT-PASSWORD', email } as const;
};

export const setPassSuccessAC = (success: boolean) => {
  return { type: 'AUTH/NEW-PASSWORD-SUCCESS', success } as const;
};

export const errorMessagesAC = (messages: string) => {
  return { type: 'AUTH/ERROR_MESSAGES', messages } as const;
};

export const loginTC =
  (email: string, password: string, rememberMe: boolean) =>
  async (dispatch: Dispatch<ActionType>) => {
    dispatch(entityStatusAC());
    try {
      dispatch(setInitializedAC(true));
      const response = await authApi.login(email, password, rememberMe);
      dispatch(setInitializedAC(false));
      dispatch(loginAC(true));
      dispatch(
        getProfileAC(
          response.data._id,
          response.data.email,
          response.data.name,
          response.data.avatar,
          response.data.publicCardPacksCount
        )
      );
    } catch (e: any) {
      dispatch(setInitializedAC(false));
      const error = e.response
        ? e.response.data.error
        : e.message + ', more details in the console';
      dispatch(errorMessagesAC(error));
    }
  };

export const logOutTC = () => async (dispatch: Dispatch<ActionType>) => {
  try {
    dispatch(setInitializedAC(true));
    await authApi.logOut();
    dispatch(setInitializedAC(false));
    dispatch(logOutAC(false));
  } catch (e: any) {
    // const error = e.response ? e.response.data.error : e.message + ', more details in the console';
    dispatch(errorMessagesAC(e.response.data.error));
  }
};

export const authMe = () => async (dispatch: Dispatch<ActionType>) => {
  try {
    await authApi.authMe();
    dispatch(loginAC(true));
  } catch (e: any) {
    // const error = e.response ? e.response.data.error : e.message + ', more details in the console';
    dispatch(errorMessagesAC(e.response.data.error));
  }
};

export const thunkUpdateUser =
  (name: string, avatar: string) => (dispatch: Dispatch<ActionType>) => {
    authApi.updateProfile(name, avatar).then(resp => {
      dispatch(updatedUserAc(resp.data.updatedUser));
    });
  };

export const forgotPasswordThunk = (email: string) => (dispatch: Dispatch) => {
  dispatch(setInitializedAC(true));
  authApi
    .forgotPassword(email)
    .then(resp => {
      dispatch(forgotPasswordAc(email));
      dispatch(setInitializedAC(false));
    })
    .catch(error => {
      dispatch(setInitializedAC(false));
      // dispatch(errorMessagesAC(error.error));
    });
};

export const createNewPasswordThunk = (password: string, token: string) => (dispatch: Dispatch) => {
  dispatch(setInitializedAC(true));
  authApi.newPassword(password, token).then(resp => {
    dispatch(setPassSuccessAC(true));
    dispatch(setInitializedAC(false));
  });
};

export type Usertype = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
};

export type ActionType =
  | ReturnType<typeof logOutAC>
  | ReturnType<typeof loginAC>
  | ReturnType<typeof updatedUserAc>
  | ReturnType<typeof setInitializedAC>
  | ReturnType<typeof entityStatusAC>
  | ReturnType<typeof forgotPasswordAc>
  | ReturnType<typeof setPassSuccessAC>
  | ReturnType<typeof errorMessagesAC>
  | ReturnType<typeof getProfileAC>;

type InitialStateType = typeof initialState;
