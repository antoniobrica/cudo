import React from 'react';
import { initI18n } from './init-i18n-service/init-i18n-service';

import './mf-core.module.scss';

/* eslint-disable-next-line */
export interface MfCoreProps {}

export function MfCore(props: MfCoreProps) {
  initI18n('/assets/i18n/{{lng}}/{{ns}}.json', 'en');
  return (
    <div>
      <h1>Welcome to mf-core!</h1>
    </div>
  );
}

export default MfCore;
