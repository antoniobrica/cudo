import React from 'react';

import './login-select.module.scss';
import { Logindrop } from '@cudo/shared-components';
import { useHistory } from 'react-router';


/* eslint-disable-next-line */
export interface LoginSelectProps {}

export function LoginSelect(props: LoginSelectProps) {
  const history = useHistory();
  const handleLogin = () => {
    history.push('/login-passwoord');
  };
  return (
    <div>
     <Logindrop login={handleLogin}  />
    </div>
  );
}

export default LoginSelect;
