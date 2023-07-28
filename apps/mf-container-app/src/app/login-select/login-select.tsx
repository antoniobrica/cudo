import React, { useEffect, useState } from 'react';

import './login-select.module.scss';
import { Logindrop } from '@cudo/shared-components/src';
import { isAuthenticated, ToEmail } from '../services/auth';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface LoginSelectProps {}

export function LoginSelect(props: LoginSelectProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setselectedCompany] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedCompany) {
      localStorage.setItem('selectedCompany', selectedCompany);
      navigate('/home/project');
    }
  };

  useEffect(() => {
    localStorage.setItem('selectedCompany', selectedCompany);
  }, [selectedCompany]);

  useEffect(() => {
    if (!isAuthenticated()) {
      console.log('tooo mail');
      ToEmail();
    } else {
      // Need to handle with redux
      setEmail(localStorage.getItem('email'));
      axios({
        url: 'https://api.cudo.com/graphql',
        method: 'post',
        data: {
          query: `
            query userQuery {
              userByEmail(email: "${localStorage.getItem('email')}") {
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
          if (result.data?.data?.userByEmail?.length == 1) {
            const element = result.data?.data?.userByEmail[0];
            const { imageUrl: image, referenceID: key, name: value } = element.references[0];
            setselectedCompany(key);
            localStorage.setItem('selectedCompany', key);
            navigate('/home/project');
            return;
          }
          const companiesList = [];
          for (let index = 0; index < result.data?.data?.userByEmail.length; index++) {
            const element = result.data?.data?.userByEmail[index];
            const { imageUrl: image, referenceID: key, name: value } = element.references[0];
            companiesList.push({
              image,
              value: key,
              key,
              text: value,
            });
          }
          setCompanies([...companiesList]);
          if (result.data?.data?.userByEmail.length == 1) {
            const element = result.data?.data?.userByEmail[0];
            const { imageUrl: image, referenceID: key, name: value } = element.references[0];
            setselectedCompany(key);
            localStorage.setItem('selectedCompany', key);
            navigate('/home/project');
          }
        }
      });
    }
  }, []);

  return (
    <div>
      <Logindrop login={handleLogin} email={email} companies={companies} selectedCompany={setselectedCompany} />
    </div>
  );
}

export default LoginSelect;
