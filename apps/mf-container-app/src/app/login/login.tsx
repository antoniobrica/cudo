import React, { useState } from 'react';

import { Loginbar } from '@cudo/shared-components/src';
import './login.module.scss';
import config from '../config/kratos';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { environment } from '../../environments/environment';
/* eslint-disable-next-line */
export interface LoginProps {}

export function Email(props: LoginProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isEmailExist, setIsEmailExist] = useState(true);

  const handleLogin = async () => {
    // Need to implement using redux

    axios({
      url: environment.MS_ACCOUNT_URL,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        query: `query userQuery {
          userByEmail(email: "${email}") {
            references {
              referenceID
              referenceType
              name
              imageUrl
              }
            }
          }
          `,
        operationName: 'userQuery',
        variables: {},
      },
    }).then((result) => {
      if (result.data?.data?.userByEmail?.length) {
        setIsEmailExist(true);
        localStorage.setItem('email', email);
        navigate(config.routes.login.path, { replace: false, state: { email } });
      } else {
        setIsEmailExist(false);
      }
    });
  };
  return (
    <div>
      <Loginbar emailSubmitHandle={handleLogin} email={setEmail} />
    </div>
  );
}

export default Email;
