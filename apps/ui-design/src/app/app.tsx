import React from 'react';

import styles from './app.module.scss';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link } from 'react-router-dom';
import { Leftmenu } from '@cudo/shared-components'
export function App() {
  return (
    <Leftmenu></Leftmenu>
  );
}

export default App;
