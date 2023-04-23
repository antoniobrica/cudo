import React, { createContext, useContext, useEffect, useState } from 'react';
import { Configuration, PublicApi, Session } from '@oryd/kratos-client';
import {
  isAuthenticated,
  unsetAuthenticated,
  login,
  refresh,
} from '../services/auth';
import config from '../config/kratos';

const kratos = new PublicApi(
  new Configuration({ basePath: config.kratos.public })
);
const SessionContext = createContext<Session>({} as Session);

export const useSession = () => useContext(SessionContext);

export const SessionProvider: React.FunctionComponent<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [session, setSession] = useState<Session>({} as Session);

  useEffect(() => {
    isAuthenticated() &&
      kratos
        .whoami()
        .then(({ data }) => {
          const now = new Date();
          const expiry = data.expires_at;
          if (now.toISOString() > expiry) return refresh();
          else setSession(data);
        })
        .catch((error) => {
          // Request may fail due to an expired token.
          unsetAuthenticated();
          login({ setReferer: false });
        });
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
