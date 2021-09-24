import { Dispatch } from 'redux';
import { authApi } from '../../api/api';

const initialState = {
  authMe: false,
  initialized: false,
  entityStatus: false,
  statusSend: false,
  userEmail: '',
  newPassSuccess: false,
  //userData: {} as Usertype,
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

    default:
      return state;
  }
};
export const entityStatusAC = () =>
  ({
    type: 'ENTITY-STATUS',
  } as const);

export const logOutAC = () => {
  return { type: 'AUTH/LOGOUT' } as const;
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

export const loginTC =
  (email: string, password: string, rememberMe: boolean) =>
  async (dispatch: Dispatch<ActionType>) => {
    dispatch(entityStatusAC());
    try {
      dispatch(setInitializedAC(true));
      await authApi.login(email, password, rememberMe);
      dispatch(setInitializedAC(false));
      dispatch(loginAC(true));
    } catch (e: any) {
      dispatch(setInitializedAC(false));
      const error = e.response
        ? e.response.data.error
        : e.message + ', more details in the console';
      alert(error);
    }
  };

export const thunkLogOut = () => (dispatch: Dispatch<ActionType>) => {
  authApi.logOut().then(resp => {
    dispatch(logOutAC());
  });
};

export const authMe = () => (dispatch: Dispatch<ActionType>) => {
  authApi
    .authMe()
    .then(res => {
      dispatch(loginAC(true));
    })
    .catch(e => console.log(e));
};

export const thunkUpdateUser =
  (name: string, avatar: string) => (dispatch: Dispatch<ActionType>) => {
    authApi.updateProfile(name, avatar).then(resp => {
      dispatch(updatedUserAc(resp.data.updatedUser));
    });
  };

export const forgotPasswordThunk = (email: string) => (dispatch: Dispatch) => {
  dispatch(setInitializedAC(true));
  authApi.forgotPassword(email).then(resp => {
    dispatch(forgotPasswordAc(email));
    dispatch(setInitializedAC(false));
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
  | ReturnType<typeof setPassSuccessAC>;

type InitialStateType = typeof initialState;
