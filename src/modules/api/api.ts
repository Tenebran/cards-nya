import axios from 'axios';
import { resetEmailApi } from './messageStyle';

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0',
  // baseURL: 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
});

export const authApi = {
  login(email: string, password: string, rememberMe: boolean) {
    return instance.post<LoginResponseType>('/auth/login', { email, password, rememberMe });
  },
  register(email: string, password: string) {
    return instance.post<AddUserResponseType>('/auth/register', { email, password });
  },

  authMe() {
    return instance.post<LoginResponseType>('/auth/me');
  },
  updateProfile(name: string, avatar: string) {
    return instance.put<UpdateUserResponseType>('/auth/me', { name, avatar });
  },
  logOut() {
    return instance.delete<LogOutNewPassUser>('/auth/me');
  },
  forgotPassword(email: string) {
    return instance.post<LogOutNewPassUser>('/auth/forgot', {
      email,
      message: resetEmailApi,
    });
  },
  newPassword(password: string, resetPasswordToken: string) {
    return instance.post<LogOutNewPassUser>('/auth/set-new-password', {
      password,
      resetPasswordToken,
    });
  },
};

export const cardsPackApi = {
  getCardsPack(cardPacks: CardsPackType) {
    return instance.get<GetCards>(`/cards/pack/?}`, { params: cardPacks });
  },
  postCardsPack(cardsPack: PostCardsPackType) {
    return instance.post('/cards/pack', cardsPack);
  },
  deleteCardsPack(id: string) {
    return instance.delete(`/cards/pack/?id=${id}`);
  },
  updateCardsPack(cardsPack: UpdateCardsPackType) {
    return instance.put('/cards/pack', cardsPack);
  },
};

export const CardsApi = {
  getCards(card: GetCardsType) {
    return instance.get(
      `/cards/card/?cardsPack_id=${card.cardsPack_id}&min=${card.min}&max=${card.max}&page=${card.page}&pageCount=${card.pageCount}`
    );
  },
  postCards(card: PostCardsType) {
    return instance.post(`/cards/card/`, card);
  },
  deleteCards(id: string) {
    return instance.delete(`/cards/card/?id${id}`);
  },
  updateCards(card: UpdateCardsType) {
    return instance.put(`/cards/card/`, card);
  },
};

export type GetCards = {
  cardPacks: [
    {
      cardsCount: number;
      created: string;
      grade: number;
      more_id: string;
      name: string;
      path: string;
      private: boolean;
      rating: number;
      shots: number;
      type: string;
      updated: string;
      user_id: string;
      user_name: string;
      __v: number;
      _id: string;
    }
  ];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};

type LoginResponseType = {
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

type AddUserResponseType = {
  addUser: any;
  error?: string;
};

type UpdateUserResponseType = {
  updatedUser: LoginResponseType;
  error?: string;
};

type LogOutNewPassUser = {
  info: string;
  error: string;
};

export type CardsPackType = {
  min: number;
  max: number;
  page: number;
  pageCount: number;
};

export type PostCardsPackType = {
  name: string;
  deckCover: string;
};

export type UpdateCardsPackType = {
  _id: string;
  name: string;
};

export type GetCardsType = {
  cardsPack_id: string;
  min: number;
  max: number;
  page: number;
  pageCount: number;
};

export type PostCardsType = {
  cardsPack_id: string;
  question: string;
  answer: string;
};

export type UpdateCardsType = {
  _id: string;
  question: string;
};
