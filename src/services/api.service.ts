import axios, { AxiosInstance } from 'axios';
import Constants from 'expo-constants';

import ApiServiceAbstract from '../types/api-service.abstract';

export const axiosInstance = axios.create({
  baseURL: Constants.manifest?.extra?.prod_url || '',
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
