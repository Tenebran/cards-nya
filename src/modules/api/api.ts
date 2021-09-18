import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0',
  withCredentials: true,
});

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
    return instance.post('/auth/login', { email, password, rememberMe });
  },
  register(email: string, password: string) {
    return instance.post('/auth/register', { email, password });
  },
  authMe() {
    return instance.post('/auth/me');
  },
  updateProfile(name: string, avatar: string) {
    return instance.put('/auth/me', { name, avatar });
  },
  logOut() {
    return instance.delete('/auth/me');
  },
  forgotPassword(email: string) {
    return instance.post('/auth/forgot', {
      email,
      messages: `<div style="font-size: 16px">Click the link below and you'll be redirected to a site where you can set a new password</div>
      <div><a style="${btnStyle}" href='https://m-marc.github.io/cards-nya/#/newpassword/$token$'>Set new password</a></div>`,
    });
  },
  newPassword(password: string, resetPasswordToken: string) {
    return instance.post('/auth/set-new-password', { password, resetPasswordToken });
  },
};
