import React, { useEffect, useState } from 'react';

import './login-select.module.scss';
import { Logindrop } from '@cudo/shared-components';
import { useHistory } from 'react-router';
import { isAuthenticated, ToEmail } from '../services/auth';


/* eslint-disable-next-line */
export interface LoginSelectProps { }

export function LoginSelect(props: LoginSelectProps) {
  const history = useHistory();
  const handleLogin = () => {
    history.push('/home');
  };
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (!isAuthenticated()) {
      ToEmail()
    }
    else {
      // Need to handle with redux
      setEmail(localStorage.getItem('email'))
    }
  }, [])
  return (
    <div>
      <Logindrop login={handleLogin} email={email} />
    </div>
  );
}

export default LoginSelect;
