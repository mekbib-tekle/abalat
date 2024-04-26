import React from 'react'
import { Auth } from './types';
import Login from './Login';
import { isValidToken } from './utils/token';

type Props = {
  children: React.ReactNode;
  authToken: Auth | undefined;
  setAuthToken: React.Dispatch<React.SetStateAction<Auth | undefined>>;
}

const AuthProvider = ({ authToken, setAuthToken, children }: Props) => {

  const token = localStorage.getItem('authToken');

  if (!authToken || !authToken.access_token) {
    if (!isValidToken(token)) {
      return <Login setAuthToken={setAuthToken} />
    }
  }

  return <>{children}</>
}

export default AuthProvider;