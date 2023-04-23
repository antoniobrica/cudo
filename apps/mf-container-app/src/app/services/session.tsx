import React, { createContext, useContext, useEffect, useState } from 'react';
import { isAuthenticated, unsetAuthenticated, login, refresh } from '../services/auth';
import config from '../config/kratos';

const SessionContext = createContext({});

export const useSession = () => useContext(SessionContext);

export const SessionProvider: React.FunctionComponent<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [session, setSession] = useState({});

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};
