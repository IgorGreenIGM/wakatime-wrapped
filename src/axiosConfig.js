// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://wakatime-wrapped.up.railway.app/',
  withCredentials: true, // Ensure cookies/session data are sent
});

export default instance;