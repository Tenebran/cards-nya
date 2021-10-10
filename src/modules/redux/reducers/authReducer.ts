import { bindActionCreators, Dispatch } from 'redux';
import { authApi } from '../../api/authApi';
import { getProfileAC, InitialStateProfileType } from './profileReducer';

const initialState = {
  authMe: false as boolean,
  entityStatus: false as boolean,
  statusSend: false as boolean,
  userEmail: '' as string,
  newPassSuccess: false as boolean,
  errorMessage: '' as string,
  initialized: false as boolean,
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionAuthType
): InitialStateType => {
  switch (action.type) {
    case 'AUTH/LOGIN': {
      return { ...state, authMe: action.authMe };
    }

    case 'AUTH/FORGOT-PASSWORD':
      return { ...state, statusSend: true, userEmail: action.email };

    case 'AUTH/NEW-PASSWORD-SUCCESS':
      return { ...state, newPassSuccess: action.success };

    case 'AUTH/ERROR_MESSAGES':
      return { ...state, errorMessage: action.messages };

    case 'AUTH/SET_INITIALIZED':
      return { ...state, initialized: action.initialized };

    default:
      return state;
  }
};
export const entityStatusAC = () =>
  ({
    type: 'ENTITY-STATUS',
  } as const);

export const loginAC = (authMe: boolean) => {
  return { type: 'AUTH/LOGIN', authMe } as const;
};

// export const updatedUserAc = (userData: Usertype) => {
//   return { type: 'AUTH/UPDATE-USER', userData } as const;
// };

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
  async (dispatch: Dispatch<ActionAuthType>) => {
    dispatch(entityStatusAC());
    try {
      const response = await authApi.login(email, password, rememberMe);
      dispatch(
        getProfileAC(
          response.data._id,
          response.data.email,
          response.data.name,
          response.data.avatar,
          response.data.publicCardPacksCount
        )
      );
      dispatch(loginAC(true));
    } catch (e: any) {
      dispatch(setInitializedAC(false));
      const error = e.response
        ? e.response.data.error
        : e.message + ', more details in the console';
      dispatch(errorMessagesAC(error));
    }
  };

export const logOutTC = () => async (dispatch: Dispatch<ActionAuthType>) => {
  try {
    await authApi.logOut();
    dispatch(setInitializedAC(false));
    dispatch(loginAC(false));
  } catch (e: any) {
    dispatch(errorMessagesAC(e.response.data.error));
  }
};

export const authMe = () => async (dispatch: Dispatch<ActionAuthType>) => {
  try {
    const respons = await authApi.authMe();
    dispatch(
      getProfileAC(
        respons.data._id,
        respons.data.email,
        respons.data.name,
        respons.data.avatar,
        respons.data.publicCardPacksCount
      )
    );
    dispatch(loginAC(true));
  } catch (e: any) {
    dispatch(errorMessagesAC(e.response.data.error));
  }
};

export const thunkUpdateUser =
  (name: string, avatar: string) => (dispatch: Dispatch<ActionAuthType>) => {
    authApi.updateProfile(name, avatar).then(resp => {
      dispatch(
        getProfileAC(
          resp.data.updatedUser._id,
          resp.data.updatedUser.email,
          resp.data.updatedUser.name,
          resp.data.updatedUser.avatar,
          resp.data.updatedUser.publicCardPacksCount
        )
      );
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

export type ActionAuthType =
  | ReturnType<typeof loginAC>
  | ReturnType<typeof setInitializedAC>
  | ReturnType<typeof entityStatusAC>
  | ReturnType<typeof forgotPasswordAc>
  | ReturnType<typeof setPassSuccessAC>
  | ReturnType<typeof errorMessagesAC>
  | ReturnType<typeof getProfileAC>;

type InitialStateType = typeof initialState;
