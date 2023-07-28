import { useState, useEffect } from 'react';
import { FrontendApi, Configuration, Session } from '@ory/client';

const basePath = 'http://localhost:4433';
const ory = new FrontendApi(
  new Configuration({
    basePath,
  })
);

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [logoutUrl, setLogoutUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await ory.toSession();
        setSession(data);
        const logoutFlow = await ory.createBrowserLogoutFlow();
        setLogoutUrl(logoutFlow.data.logout_url);
      } catch (error) {
        console.error(error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { session, logoutUrl, loading };
};

export default useSession;
