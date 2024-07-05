/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface AxiosRequestResult {
  data: any;
  status: number;
  isError: boolean;
  error: any;
}

interface AxiosRequestConfigWithAuth extends AxiosRequestConfig {
  isAuth?: boolean;
}

/**
 * @description axios hook
 * @param {AxiosRequestConfigWithAuth} obj
 * @returns {Promise<AxiosRequestResult>}
 */
const axiosRequest = async (obj: AxiosRequestConfigWithAuth): Promise<AxiosRequestResult> => {
  let error: any;
  let isError = false;

  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const headers = obj.headers || {};

    if (obj.isAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response: AxiosResponse = await axios.request({
      ...obj,
      baseURL: obj.baseURL || baseURL,
      headers,
    });
    
    const { data, status } = response;

    return { data, status, isError, error };
  } catch (err: any) {
    if (err.response && err.response.data) {
      if (typeof err.response.data === 'string') {
        error = err.response.data;
      } else {
        error = err.response.data.message || err.response.data.data;
      }
    } else {
      error = err.message;
    }

    isError = true;

    return { data: null, status: 400, isError, error };
  }
};

export default axiosRequest;
