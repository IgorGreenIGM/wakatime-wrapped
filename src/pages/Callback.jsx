import React, { useEffect, useState } from 'react';
import { fetchAuthToken } from '../services/Api';

const ErrorMessage = () => (
  <div
    style={{
      margin: '0 auto',
      alignItems: 'center',
      marginTop: '300px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div>
      <h1
        style={{
          color: 'red',
          marginTop: '20px',
          textAlign: 'center',
        }}
      >
        Error Accessing your data, please retry again.
      </h1>
    </div>
  </div>
);

const WaitingMessage = () => (
  <div
    style={{
      margin: '0 auto',
      alignItems: 'center',
      marginTop: '300px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div>
      <h1
        style={{
          color: 'white',
          marginTop: '20px',
          textAlign: 'center',
        }}
      >
        Authentication in progress
      </h1>
    </div>
    <div>
      <h1
        style={{
          color: 'white',
          fontSize: '20px',
          marginTop: '20px',
          textAlign: 'center',
        }}
      >
        Please wait while we process your request.
      </h1>
    </div>
  </div>
);

const Callback = () => {
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const getQueryParam = (param) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    };

    const authorizationCode = getQueryParam('code');

    if (authorizationCode) {
      setIsWaiting(true);
      fetchAuthToken(authorizationCode).then((data) => {
        if (data.split('=') === 'error') {
          console.error(data);
          setIsWaiting(false);
        } 
        else 
        {
          const token = data.split('&')[0].split('=')[1].trim();
          localStorage.setItem('wakatime-access-token', token);
          window.location.href = '/stats';
        }
      }).catch((err) => {
        console.error(err);
        setIsWaiting(false);
      });

    } else {
      window.alert('Error: No authorization code found.');
      window.location.href = '/';
    }
  }, []);

  return isWaiting ? <WaitingMessage /> : <ErrorMessage />;
};

export default Callback;