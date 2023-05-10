import React, { createContext, useContext, useEffect, useState } from 'react';
import { FrontendApi, Configuration, Session, Identity } from '@ory/client';
import { useAppSelector } from '../hooks';

interface SessionContextValue {
  session?: Session;
  logoutUrl?: string;
}

export const SessionContext = createContext<SessionContextValue>({} as SessionContextValue);

export const useSession = () => useContext(SessionContext);

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider: React.FunctionComponent<SessionProviderProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | undefined>();
  const [logoutUrl, setLogoutUrl] = useState<string | undefined>();

  const { loggedIn } = useAppSelector((state) => state.user);

  // const basePath = 'https://youthful-poitras-uhe0c70luy.projects.oryapis.com';
  const basePath = process.env.REACT_APP_ORY_URL || 'http://localhost:4000';
  const ory = new FrontendApi(
    new Configuration({
      basePath,
      baseOptions: {
        withCredentials: true,
      },
    })
  );

  // Returns either the email or the username depending on the user's Identity Schema
  const getUserName = (identity: Identity) => identity.traits.email || identity.traits.username;

  // Second, gather session data, if the user is not logged in, redirect to login
  useEffect(() => {
    // remove this future
    if (!loggedIn) {
      ory
        .toSession()
        .then(({ data }) => {
          console.log(data);
          // User has a session!
          setSession(data);
          ory.createBrowserLogoutFlow().then(({ data }) => {
            // Get also the logout url
            setLogoutUrl(data.logout_url);
          });
        })
        .catch((err) => {
          console.error(err);
          // Redirect to login page
          window.location.replace(`${basePath}/ui/login`);
        });
    }
  }, [loggedIn]);

  console.log(logoutUrl);

  const value = {
    session,
    logoutUrl,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
