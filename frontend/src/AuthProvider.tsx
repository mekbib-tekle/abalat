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
  function isValidToken(token: string|null) {
    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token);

      if (decodedToken && decodedToken.exp) {
        return decodedToken.exp > Date.now() / 1000;
      }
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return false;
    }
  }

  const token = localStorage.getItem('authToken');

  if(!authToken || !authToken.access_token) {
    if (!isValidToken(token)) {
      return <Login setAuthToken={setAuthToken}/>
    }
  }

  return <>{children}</>
}

export default AuthProvider;