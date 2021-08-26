import React from 'react';
import { environment } from '../../environments/environment';
import MicroFrontend from '../../MicroFrontend';

import './mf-project-app-mount.module.scss';

/* eslint-disable-next-line */
export interface MfProjectAppMountProps {
  history?
  host?
}

export function MfProjectAppMount(props: MfProjectAppMountProps) {
  console.log('-Container--MfProjectAppMount--props--',props)
  return (
    <MicroFrontend history={props.history} host={props.host} name="ProjectApp" />
  );
}
export default MfProjectAppMount;
