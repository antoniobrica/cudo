import React, { useEffect, useState } from 'react';

import { Loginbar } from '@cudo/shared-components/src';
import './login.module.scss';
import config from '../config/kratos';
import { LoginFlow } from '@oryd/kratos-client';
import { initialiseRequest } from '../services/kratos';
import { useNavigate } from 'react-router-dom';
/* eslint-disable-next-line */
export interface LoginProps {}

export function Email(props: LoginProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const handleLogin = () => {
    // Need to implement using redux
    localStorage.setItem('email', email);

    navigate('/');

    // history.push(config.routes.login.path, { email });
  };
  return (
    <div>
      <Loginbar emailSubmitHandle={handleLogin} email={setEmail} />
    </div>
  );
}

export default Email;
