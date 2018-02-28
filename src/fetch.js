import axios from 'axios';
import { Toast } from 'antd-mobile';

const fetch = axios.create({
  baseURL: '/api'
});

fetch.interceptors.request.use((config) => {
  Toast.loading('加载中...', 0);
  return config;
});

fetch.interceptors.response.use(
  (response) => {
    Toast.hide();
    return response.data;
  },
  (error) => {
    Toast.hide();
    throw error;
  }
);

export default fetch;
