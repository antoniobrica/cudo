import React from 'react';

import { Loginbar } from '@cudo/shared-components';
import ProjectMenu from '../../../../mf-project-app/src/app/project-menu/project-menu'
import './login.module.scss';
import { useHistory } from "react-router";
/* eslint-disable-next-line */
export interface LoginProps {
}

export function Login(props: LoginProps) {
  const history = useHistory();
  const handleLogin = () => {
    history.push('/home');
  };
  return (
    <div>
      <Loginbar login={handleLogin} />
      {/* <ProjectMenu /> */}
      {/* <button onClick={handleLogin}>Login</button> */}
    </div>
  );
}

export default Login