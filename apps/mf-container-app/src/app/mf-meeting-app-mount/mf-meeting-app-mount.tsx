import React, { useEffect } from 'react';
import { environment } from '../../environments/environment';
import useMicrofrontend from '../hooks/useMicrofrontend';

import './mf-meeting-app-mount.module.scss';

/* eslint-disable-next-line */
export interface MfMeetingAppMountProps { }

export function MfMeetingAppMount(props: MfMeetingAppMountProps) {
  const id = 'mf-meeting-app';
  const { isLoaded, mfProducts } = useMicrofrontend(id, environment.REACT_APP_PROJECT_HOST);

  useEffect(() => {
    if (!mfProducts) return;
    const { render, unMount } = mfProducts;
    render(id);

    return () => unMount(id);
  }, [isLoaded]); // eslint-disable-line

  if (!isLoaded) return null;
  if (!mfProducts) return <div>'Products microfrontend is not available'</div>;

  return <div id={id} />;
}

export default MfMeetingAppMount;
