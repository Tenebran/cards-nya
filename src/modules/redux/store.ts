import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authReducer } from './reducers/authReducer';
import { profileReducer } from './profile/profileReducer';
import thunk from 'redux-thunk';
import { registrationReducer } from './reducers/registrationReducer';
import { cardsPackReducer } from './reducers/cardsPacksReducers';

const reducers = combineReducers({
  profile: profileReducer,
  user: authReducer,
  registration: registrationReducer,
  cardsPack: cardsPackReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;

export type AppStoreType = ReturnType<typeof reducers>;

// @ts-ignore
window.store = store; // for dev
