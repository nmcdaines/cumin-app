
import axios, { baseUrl } from './axios';
import { REFRESH_TOKEN, ACCESS_TOKEN } from './constants';

interface IAuthRequest {
  email: string;
  password: string;
}

export const auth = {
  login: (body: any) =>
    axios.post(`${baseUrl}/auth/login`, body),
  register: (body: IAuthRequest) =>
    axios.post(`${baseUrl}/auth/register`, body),
  logout: () => {
    const response = axios.delete(`${baseUrl}/auth/logout`);

    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN);

    return response;
  },
  me: () => axios.get(`${baseUrl}/auth/me`),
}

export const recipe = {
  all: () => axios.get(`${baseUrl}/recipes`),
  get: (id: number | string) => axios.get(`${baseUrl}/recipes/${id}`),
}

