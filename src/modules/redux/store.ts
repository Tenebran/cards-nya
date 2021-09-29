import {applyMiddleware, combineReducers, createStore} from 'redux';
import { authReducer } from './reducers/authReducer';
import { profileReducer } from './reducers/profileReducer';
import thunk from "redux-thunk";
import {registrationReducer} from "./reducers/registrationReducer";

const reducers = combineReducers({
  profile: profileReducer,
  user: authReducer,
  registration: registrationReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;

export type AppStoreType = ReturnType<typeof reducers>;

// @ts-ignore
window.store = store; // for dev
