import React from 'react';

import './login.module.scss';
import { useHistory } from "react-router";
/* eslint-disable-next-line */
export interface LoginProps {
}

export function Login(props: LoginProps) {
  const history = useHistory();
  console.log('history', history)
   const handleLogin =() => {
        history.push('/home');
  };
  return (
    <div>
      <h1>Welcome to login!</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login