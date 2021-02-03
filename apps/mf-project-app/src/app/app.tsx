import React from 'react';

import styles from './app.module.scss';
import {SetList} from '@cudo/ui';
import { Route, Link } from 'react-router-dom';
import ProjectInfo from './components/project-info/project-info';
import { Leftmenu } from '@cudo/shared-components'


export function App() {
  return (
    <div className={styles.app}>
      <Leftmenu />
      <ProjectInfo ></ProjectInfo>
   
    </div>
  );
}

export default App;
