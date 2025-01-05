// axiosConfig.js
import axios from 'axios';

export const baseUrl = () => {
  return 'https://wakatime-wrapped.up.railway.app/';
};

const instance = axios.create({
  baseURL: baseUrl(),
  withCredentials: true, // Ensure cookies/session data are sent
});

export default instance;