import axios from '../axiosConfig.js';

export const checkLoginStatus = () => {
  const value = localStorage.getItem('wakatime-access-token');
  return value !== null;
};

export const fetchAuthorizationUrl = async () => {
  try {
    const response = await axios.get('/auth/authorize_url');
    return response.data;
  } catch (error) {
    console.error("Error fetching the authorize URL:", error);
    throw error;
  }
};

export const fetchAuthToken = async (code) => {
  try {
    const response = await axios.get('/auth/token', {
      params: { code }, 
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching the authentification code :", error);
    throw error;
  }
};

export const fetchUserData = async (token) => {
  try {
    const response = await axios.get('/stats', {
      params: { token }, 
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching the user datas :", error);
    throw error;
  }
};

export const fetchCard = async (token) => {
  try {
    const response = await axios.get('/stats/cards', {
      params: { token },
      responseType: 'blob',
    });

    // Create a downloadable link for the PNG
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'coding-stats-card.png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error("Error fetching the PNG card:", error);
    throw error;
  }
};