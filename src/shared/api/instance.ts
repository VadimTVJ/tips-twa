import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333/api', // todo to env
});

axiosInstance.interceptors.request.use((config) => {
  console.log('axios', window.location.hash);

  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash);
  const initData = params.get('tgWebAppData');

  config.headers.setAuthorization(initData);

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
