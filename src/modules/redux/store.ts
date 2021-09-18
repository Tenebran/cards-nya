import { combineReducers, createStore } from 'redux';
import { authReducer } from './auth/authReduser';
import { profileReducer } from './profile/profileReducer';

const reducers = combineReducers({
  profile: profileReducer,
  user: authReducer,
});

const store = createStore(reducers);

export default store;

export type AppStoreType = ReturnType<typeof reducers>;

// @ts-ignore
window.store = store; // for dev
