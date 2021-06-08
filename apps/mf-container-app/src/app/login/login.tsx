import React, { useEffect, useState } from 'react';

import { Loginbar } from '@cudo/shared-components';
import './login.module.scss';
import config from "../config/kratos"
import { useHistory } from "react-router";
import { LoginFlow } from '@oryd/kratos-client';
import { initialiseRequest } from '../services/kratos';
import axios from 'axios';
/* eslint-disable-next-line */
export interface LoginProps {
}

export function Email(props: LoginProps) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [isEmailExist, setIsEmailExist] = useState(true);
  const handleLogin = () => {
    // Need to implement using redux
    axios({
      url: 'http://192.168.29.131:5001/graphql',
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
      console.log(result.data?.data?.userByEmail);
      if (result.data?.data?.userByEmail?.length) {
        setIsEmailExist(true)
        localStorage.setItem('email', email);
        history.push(config.routes.login.path, { email });
      }
      else {
        setIsEmailExist(false)
      }

    });
  };
  return (
    <div>
      <Loginbar emailSubmitHandle={handleLogin} email={setEmail} isEmailExist={isEmailExist} />
    </div>
  );
}

export default Email