import React, { useEffect, useState } from 'react';

import { Loginbar } from '@cudo/shared-components';
import './login.module.scss';
import config from "../config/kratos"
import { useHistory } from "react-router";
import { LoginFlow } from '@oryd/kratos-client';
import { initialiseRequest } from '../services/kratos';
/* eslint-disable-next-line */
export interface LoginProps {
}

export function Email(props: LoginProps) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const handleLogin = () => {
    // Need to implement using redux
    localStorage.setItem('email', email);
    history.push(config.routes.login.path, { email });
  };
  return (
    <div>
      <Loginbar emailSubmitHandle={handleLogin} email={setEmail} />
    </div>
  );
}

export default Email