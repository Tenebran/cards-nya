import { applyMiddleware, combineReducers, createStore } from 'redux';
import { ActionAuthType, authReducer } from './reducers/authReducer';
import thunk, { ThunkAction } from 'redux-thunk';
import { registrationReducer } from './reducers/registrationReducer';
import { ActionCardsPackType, cardsPackReducer } from './reducers/cardsPacksReducers';
import { ActionCardsType, cardsReducer } from './reducers/cardsReducer';
import { ActionProfileType, profileReducer } from './reducers/profileReducer';
import { ActionAppType, appReducer } from './reducers/appReducer';
import { ActionRegistrationType } from './reducers/registrationReducer';

const reducers = combineReducers({
  profile: profileReducer,
  user: authReducer,
  registration: registrationReducer,
  cardsPack: cardsPackReducer,
  cards: cardsReducer,
  app: appReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;

export type AppStoreType = ReturnType<typeof reducers>;

type AppActionsType =
  | ActionRegistrationType
  | ActionProfileType
  | ActionCardsType
  | ActionCardsPackType
  | ActionAuthType
  | ActionAppType;

export type ThunkType = ThunkAction<void, AppStoreType, unknown, AppActionsType>;
// @ts-ignore
window.store = store; // for dev
