import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";


export type CustomAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

export type CustomAxiosError = AxiosError & {
  config: CustomAxiosRequestConfig;
};

export const baseUrl: "/api";

// TODO: need to create a layer to to use custom storage provider

axios.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  function (error: CustomAxiosError) {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (
      refreshToken &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const headers = { "Refresh-Token": refreshToken };
      return axios
        .post(`${baseUrl}/api/auth/refresh`, undefined, { headers })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            const { headers } = res;
            localStorage.setItem("refresh_token", headers[REFRESH_TOKEN]);
            localStorage.setItem("access_token", headers[ACCESS_TOKEN]);
            return axios(originalRequest);
          }
        });
    }

    return Promise.reject(error);
  }
);

export default axios;
