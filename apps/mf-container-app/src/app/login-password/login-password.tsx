import React from 'react';

import './login-password.module.scss';
import { Loginpassword } from '@cudo/shared-components';
import { useHistory } from 'react-router';

/* eslint-disable-next-line */
export interface LoginPasswordProps {}

export function LoginPassword(props: LoginPasswordProps) {
  const history = useHistory();
  const handleLogin = () => {
    history.push('/home');
  };
  return (
    <div>
      <Loginpassword login={handleLogin} />
    </div>
  );
}

export default LoginPassword;
