import {Dispatch} from 'redux';
import {authApi} from '../../api/api';

const initialState = {
    authMe: false,
    initialized: false,
    entityStatus: false,
    //userData: {} as Usertype,
};


export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionType
): InitialStateType => {
    switch (action.type) {
        case 'AUTH/LOGIN': {
            return {...state, authMe: action.authMe};
        }
        case 'SET_INITIALIZED':
            return {
                ...state,
                initialized: action.initialized,
            }
        case 'AUTH/LOGOUT':
            return {
                ...state,
                authMe: action.authMe,
            }

        /* case 'AUTH/UPDATE-USER':
             return {...state, userData: action.userData};*/

        default:
            return state;
    }
};
export const entityStatusAC = () => ({
    type: 'ENTITY-STATUS',
} as const)

export const logOutAC = (authMe: boolean) => {
    return {type: 'AUTH/LOGOUT', authMe} as const;
};

export const loginAC = (authMe: boolean) => {
    return {type: 'AUTH/LOGIN', authMe} as const;
};

export const updatedUserAc = (userData: Usertype) => {
    return {type: 'AUTH/UPDATE-USER', userData} as const;
};

export const setInitializedAC = (initialized: boolean) => ({
    type: 'SET_INITIALIZED',
    initialized
} as const);

export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch<ActionType>) => {
    dispatch(entityStatusAC())
    try {
        dispatch(setInitializedAC(true))
        await authApi.login(email, password, rememberMe)
        dispatch(setInitializedAC(false))
        dispatch(loginAC(true))
    } catch (e: any) {
        dispatch(setInitializedAC(false))
        const error = e.response ? e.response.data.error : (e.message + ", more details in the console")
        alert(error)
    }
};

export const logOutTC = () => async (dispatch: Dispatch<ActionType>) => {
    try {
        dispatch(setInitializedAC(true))
        await authApi.logOut()
        dispatch(setInitializedAC(false))
        dispatch(logOutAC(false))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ", more details in the console")
        alert(error)
    }

};

export const authMe = () => async (dispatch: Dispatch<ActionType>) => {
    try {
        await authApi.authMe()
        dispatch(loginAC(true))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ", more details in the console")
        alert(error)
    }


};

export const thunkUpdateUser =
    (name: string, avatar: string) => (dispatch: Dispatch<ActionType>) => {
        authApi.updateProfile(name, avatar).then(resp => {
            dispatch(updatedUserAc(resp.data.updatedUser));
        });
    };
////////////////////////////////////////////////////// must be test////////////////////////////////////////////////////////////////

export const forgotPasswordAc = (email: string) => {
    return {type: 'FORGOT-PASSWORD', email};
};

export const forgotPasswordThunk = (email: string) => (dispatch: Dispatch) => {
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
    | ReturnType<typeof updatedUserAc>
    | ReturnType<typeof setInitializedAC>
    | ReturnType<typeof entityStatusAC>;

type InitialStateType = typeof initialState;
