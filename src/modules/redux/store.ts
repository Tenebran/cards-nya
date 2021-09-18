import {applyMiddleware, combineReducers, createStore} from 'redux';
import { authReducer } from './auth/authReduser';
import { profileReducer } from './profile/profileReducer';
import thunk from "redux-thunk";

const reducers = combineReducers({
  profile: profileReducer,
  user: authReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;

export type AppStoreType = ReturnType<typeof reducers>;

// @ts-ignore
window.store = store; // for dev
