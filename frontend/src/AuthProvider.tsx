import React, { useEffect, useState } from 'react'
import { Auth } from './types';
import Login from './Login';
import { jwtDecode } from "jwt-decode";

type Props = {
    children: React.ReactNode;
    authToken: Auth | undefined;
    setAuthToken: React.Dispatch<React.SetStateAction<Auth | undefined>>;
}

const AuthProvider = ({ authToken, setAuthToken, children }: Props) => {
  function isTokenExpired(token: string) {
    try {
      const decodedToken: any = jwtDecode(token);

      if (decodedToken && decodedToken.exp) {
        return decodedToken.exp < Date.now() / 1000;
      }
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return true;
    }
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      // Handle expired token (e.g., redirect to login)
    }
  }, []);


  if(!authToken || !authToken.access_token) {
    if (!isLoggedIn) {
      return <Login setAuthToken={setAuthToken}/>
    }
  }

  return <>{children}</>
}

export default AuthProvider;