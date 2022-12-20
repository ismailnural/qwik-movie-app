import axios, { AxiosInstance } from 'axios';
import { BASE_URL, API_KEY } from './APIConst';

// Create axios client, pre-configured with baseURL
export const APIClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
  },
  params: {
    api_key: API_KEY
  },
  withCredentials: true,
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});

export default APIClient;
