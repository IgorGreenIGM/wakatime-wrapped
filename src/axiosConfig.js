// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  withCredentials: true, // Ensure cookies/session data are sent
});

export default instance;