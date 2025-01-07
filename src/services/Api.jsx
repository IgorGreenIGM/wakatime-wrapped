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
    if (String(error.response.status) === "422")
    {
      window.alert("Cannot compute your wrapped now, wakatime is still preparing your datas.\n \
      Please wait and try again later.\n \
      If the error persists, please try on you pc web navigator.");
      window.location.href = '/'; 
    }

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

export const buildVideo = async (orientation, backendDatas) => {
  console.log(backendDatas);
  try {
    const response = await axios.post('/stats/video/build',
    orientation === 'vertical' ? 
    {'isMobile': true, ...backendDatas} : 
    {'isMobile': false, ...backendDatas},
    );
    return response.data;
  } catch (error) {
    console.error("Error when initializing connexion for fetching video :", error);
    throw error;
  }
};

export const getBuildVideoProgression = async (renderId) => {
  try {
    const response = await axios.get('/stats/video/progress', {
      params: { renderId }, 
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching video progression :", error);
    throw error;
  }
};