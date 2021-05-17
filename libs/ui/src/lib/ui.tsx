import React from 'react';
import SetList from './set-lest/set-lest';

import './ui.module.scss';

/* eslint-disable-next-line */
export interface UiProps {}

export function Ui(props: UiProps) {
  return (
    <div>
      <h1>Welcome to ui!</h1>
      <SetList />
    </div>
  );
}

export default Ui;
