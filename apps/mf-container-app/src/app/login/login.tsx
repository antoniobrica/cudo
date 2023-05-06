import React, { useEffect, useState } from 'react';

import { Loginbar } from '@cudo/shared-components/src';
import './login.module.scss';
import config from '../config/kratos';
import { useNavigate } from 'react-router-dom';
import { LoginFlow } from '@oryd/kratos-client';
import { initialiseRequest } from '../services/kratos';
import axios from 'axios';
import { environment } from '../../environments/environment';
/* eslint-disable-next-line */
export interface LoginProps {}

export function Email(props: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isEmailExist, setIsEmailExist] = useState(true);
  
  console.log(email)

  const handleLogin = () => {
    // Need to implement using redux
    axios({
      url: environment.MS_ACCOUNT_URL,
      method: 'post',
      data: {
        query: `
          query userQuery {
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
      },
    }).then((result) => {
      if (result.data?.data?.userByEmail?.length) {
        setIsEmailExist(true);
        localStorage.setItem('email', email);
        navigate(config.routes.login.path, { state: { email } });
      } else {
        setIsEmailExist(false);
      }
    });
  };
  return (
    <div>
      <Loginbar
        emailSubmitHandle={handleLogin}
        email={setEmail}
        isEmailExist={isEmailExist}
        setIsEmailExist={setIsEmailExist}
      />
    </div>
  );
}

export default Email;
