import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authReducer } from './reducers/authReducer';

import thunk from 'redux-thunk';
import { registrationReducer } from './reducers/registrationReducer';
import { cardsPackReducer } from './reducers/cardsPacksReducers';
import { cardsReducer } from './reducers/cardsReducer';
import { profileReducer } from './reducers/profileReducer';

const reducers = combineReducers({
  profile: profileReducer,
  user: authReducer,
  registration: registrationReducer,
  cardsPack: cardsPackReducer,
  cards: cardsReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;

export type AppStoreType = ReturnType<typeof reducers>;

// @ts-ignore
window.store = store; // for dev
