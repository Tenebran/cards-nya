import axios from 'axios';
import { resetEmailApi } from './messageStyle';

export const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0',
  // baseURL: 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
});
