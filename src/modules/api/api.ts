import axios from 'axios';
import { resetEmailApi } from './messageStyle';

const instance = axios.create({
  // baseURL: 'http://localhost:7542/2.0',
  baseURL: 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
});

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

export const authApi = {
  login(email: string, password: string, rememberMe: boolean) {
    return instance.post<LoginResponseType>('/auth/login', { email, password, rememberMe });
  },
  register(email: string, password: string) {
    return instance.post<AddUserResponseType>('/auth/register', { email, password });
  },
  // authMe(email: string, password: string, checked: boolean) {
  //   return instance.post<LoginResponseType>('/auth/me', { email, password, checked });
  // },
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
