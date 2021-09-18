import { Dispatch } from 'redux';
import { authApi } from '../../api/api';

const initialState = {
  userData: {} as Usertype,
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case 'AUTH/LOGIN': {
      return { ...state, userData: action.userData };
    }
    case 'AUTH/LOGOUT': {
      return { ...state };
    }
    case 'AUTH/UPDATE-USER':
      return { ...state, userData: action.userData };

    default:
      return state;
  }
};

export const logOutAC = () => {
  return { type: 'AUTH/LOGOUT' } as const;
};

export const loginAC = (userData: Usertype) => {
  return { type: 'AUTH/LOGIN', userData } as const;
};

export const updatedUserAc = (userData: Usertype) => {
  return { type: 'AUTH/UPDATE-USER', userData } as const;
};

export const thunkLogin =
  (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionType>) => {
    authApi.login(email, password, rememberMe).then(resp => {
      dispatch(loginAC(resp.data));
    });
  };

export const thunkLogOut = () => (dispatch: Dispatch<ActionType>) => {
  authApi.logOut().then(resp => {
    dispatch(logOutAC());
  });
};

export const thunkUpdateUser =
  (name: string, avatar: string) => (dispatch: Dispatch<ActionType>) => {
    authApi.updateProfile(name, avatar).then(resp => {
      dispatch(updatedUserAc(resp.data.updatedUser));
    });
  };
////////////////////////////////////////////////////// must be test////////////////////////////////////////////////////////////////
export const registerAC = (email: string, password: string) =>
  ({ type: 'RESISTER', email, password } as const);

export const forgotPasswordAc = (email: string) => {
  return { type: 'FORGOT-PASSWORD', email };
};

export const thunkRegister = (email: string, password: string) => (dispatch: Dispatch) => {
  authApi.register(email, password).then(resp => {
    dispatch(registerAC(email, password));
  });
};

export const forgotPassowrdThunk = (email: string) => (dispatch: Dispatch) => {
  authApi.forgotPassword(email).then(resp => {
    dispatch(forgotPasswordAc(email));
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  | ReturnType<typeof updatedUserAc>;

type InitialStateType = typeof initialState;
