import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

import ApiServiceAbstract from '../types/api-service.abstract';

const URL_SIGNIN = 'auth/signin';
const URL_SIGNUP = 'auth/signup';

export const axiosInstance = axios.create({
  baseURL: Constants.manifest?.extra?.dev_url || '',
});

axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const newConfig = {
    ...config,
    headers: {
      Authorization: `Bearer ${
        (await SecureStore.getItemAsync(Constants.manifest?.extra?.token)) || null
      }`,
    },
  };
  return config.url === URL_SIGNIN || config.url === URL_SIGNUP ? config : newConfig;
});

export class ApiService extends ApiServiceAbstract {
  constructor(private requestService: AxiosInstance) {
    super();
  }

  get = async <R = void>(
    url: string,
    query?: Record<string, string | number | boolean>,
  ): Promise<R> => {
    const res = await this.requestService.get<R>(url, { params: query });
    return res.data;
  };

  post = async <R = void, B = unknown>(
    url: string,
    body?: B,
    query?: Record<string, string | number | boolean>,
  ): Promise<R> => {
    const res = await this.requestService.post<R>(url, body, { params: query });
    return res.data;
  };

  put = async <R = void, B = unknown>(
    url: string,
    body?: B,
    query?: Record<string, string | number | boolean>,
  ): Promise<R> => {
    const res = await this.requestService.put<R>(url, body, { params: query });
    return res.data;
  };

  delete = async <R = void>(
    url: string,
    query?: Record<string, string | number | boolean>,
  ): Promise<R> => {
    const res = await this.requestService.delete<R>(url, { params: query });
    return res.data;
  };
}

export default new ApiService(axiosInstance);
