import React, { useEffect, useState } from 'react';

import { Loginbar } from '@cudo/shared-components';
import './login.module.scss';
import config from "../config/kratos"
import { useHistory } from "react-router";
import { LoginFlow } from '@oryd/kratos-client';
import { initialiseRequest } from '../services/kratos';
import axios from 'axios';
import { environment } from '../../environments/environment';
/* eslint-disable-next-line */
export interface LoginProps {
}

export function Email(props: LoginProps) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [isEmailExist, setIsEmailExist] = useState(true);
  // console.log('----login page---')
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
          `
      }
    }).then((result) => {
      // console.log(result.data?.data?.userByEmail);
      if (result.data?.data?.userByEmail?.length) {
        setIsEmailExist(true)
        localStorage.setItem('email', email);

        // history.push(config.routes.testmodal.path, { email });
        history.push(config.routes.login.path, { email });
      }
      else {
        setIsEmailExist(false)
      }

    });
  };
  return (
    <div>
      <Loginbar emailSubmitHandle={handleLogin} email={setEmail} isEmailExist={isEmailExist} setIsEmailExist={setIsEmailExist} />
    </div>
  );
}

export default Email