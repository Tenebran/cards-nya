import axios from 'axios';

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

const btnStyle = `border-radius: 3px;
    background: #3aa54c;
    color: #fff;
    display: block;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.25em;
    margin: 24px 0;
    padding: 10px 18px;
    text-decoration: none;
    width: 180px;
    text-align: center;`;

export const authApi = {
  login(email: string, password: string, rememberMe: boolean) {
    return instance.post<LoginResponseType>('/auth/login', { email, password, rememberMe });
  },
  register(email: string, password: string) {
    return instance.post<AddUserResponseType>('/auth/register', { email, password });
  },
  // authMe(email: string, password: string, checked: boolean) {
  //     return instance.post<LoginResponseType>('/auth/me', {email, password, checked});
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
      messages: `<div>Click the link below and you'll be redirected to a site where you can set a new password</div>
      <div><a href='https://tenebran.github.io/cards-nya/#/newpassword/$token$'>Set new password</a></div>`,
    });
  },
  newPassword(password: string, resetPasswordToken: string) {
    return instance.post<LogOutNewPassUser>('/auth/set-new-password', {
      password,
      resetPasswordToken,
    });
  },
};
