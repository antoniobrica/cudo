import React from 'react';

import { Loginbar } from '@cudo/shared-components';
import './login.module.scss';
import { useHistory } from "react-router";
/* eslint-disable-next-line */
export interface LoginProps {
}

export function email(props: LoginProps) {
  const history = useHistory();
  const handleLogin = () => {
    history.push('/login-select');
  };
  return (
    <div>
      <Loginbar login={handleLogin} />
      {/* <ProjectMenu /> */}
      {/* <button onClick={handleLogin}>Login</button> */}
    </div>
  );
}

export default email