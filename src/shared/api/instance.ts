import axios from 'axios';
import { retrieveLaunchParams } from '@tma.js/sdk';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333/api', // todo to env
});

axiosInstance.interceptors.request.use((config) => {
  const launchParams = retrieveLaunchParams();
  config.headers.setAuthorization(launchParams.initDataRaw!);

  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  if (response.status !== 200) {
    return Promise.reject(response.data);
  }

  return response.data;
}, (error) => {
  return Promise.reject(error);
});
