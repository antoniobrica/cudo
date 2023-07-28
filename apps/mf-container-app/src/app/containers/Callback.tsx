import { useEffect } from 'react';
import config from '../config/kratos';
import {
  setAuthenticated,
  unsetAuthenticated,
  unsetAuthenticatedReferer,
  getAuthenticatedReferer,
} from '../services/auth';
import { Configuration, PublicApi } from '@oryd/kratos-client';

const kratos = new PublicApi(new Configuration({ basePath: config.kratos.public }));

export const Callback = () => {
  useEffect(() => {
    kratos
      .whoami()
      .then(({ data }) => {
        setAuthenticated();
        unsetAuthenticatedReferer();
        window.location.href = getAuthenticatedReferer() || '/';
      })
      .catch((error) => {
        unsetAuthenticated();
        unsetAuthenticatedReferer();
        console.log(error);
      });
  }, []);

  return null;
};
