import React, { useEffect, useState } from 'react';

import './login-password.module.scss';
import { Loginpassword, Messagebar } from '@cudo/shared-components/src';
// import { useHistory } from 'react-router';
import { LoginFlow } from '@oryd/kratos-client';
import { initialiseRequest } from '../services/kratos';
import { KratosMessages } from '../components/KratosMessages';
import { KratosForm } from '../components/KratosForm';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface LoginPasswordProps {}

export function LoginPassword(props: LoginPasswordProps) {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login-select');
  };
  const [email, setEmail] = useState('');
  const [requestResponse, setRequestResponse] = useState<any>();

  useEffect(() => {
    // Need to implement using redux
    setEmail(localStorage.getItem('email'));
    const request = initialiseRequest({ type: 'login' }, { filterid: 'flow' }) as Promise<LoginFlow>;
    request
      .then((request) => {
        setRequestResponse(request);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setRequestResponse, navigate]);

  const messages = requestResponse?.methods?.password?.config?.messages;
  const form = requestResponse?.methods?.password?.config;

  console.log(requestResponse);
  return (
    <div>
      {/* <Loginpassword action={form?.action} fields={form?.fields as any[]} messages={messages}></Loginpassword> */}
      {messages && <KratosMessages messages={messages} />}
      {form && <Loginpassword action={form?.action} fields={form?.fields as any[]} messages={messages}></Loginpassword>}
      {/* <div id="login-password">
        {messages && <KratosMessages messages={messages} />}
        {form &&
          <KratosForm
            submitLabel="Sign in"
            action={form.action}
            fields={form.fields}
            messages={form.messages} />}
      </div> */}
    </div>
  );
}

export default LoginPassword;
