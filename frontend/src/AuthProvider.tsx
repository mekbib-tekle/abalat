import React from 'react'
import { Auth } from './types';
import Login from './Login';

type Props = {
    children: React.ReactNode;
    authToken: Auth | undefined;
    setAuthToken: React.Dispatch<React.SetStateAction<Auth | undefined>>;
}

const AuthProvider = ({ authToken, setAuthToken, children }: Props) => {
  if(!authToken || !authToken.access_token){
    return <Login setAuthToken={setAuthToken}/>
  }

  return <>{children}</>
}

export default AuthProvider;