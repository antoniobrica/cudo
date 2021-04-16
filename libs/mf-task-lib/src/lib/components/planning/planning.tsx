import React from 'react';

import './planning.module.scss';
import { ModalPlanningNew } from '@cudo/shared-components';

/* eslint-disable-next-line */
export interface PlanningProps {}

export function Planning(props: PlanningProps) {
  return (
    <div>
      <h1>Welcome to planning!</h1>
      <ModalPlanningNew></ModalPlanningNew>
    </div>
  );
}

export default Planning;
