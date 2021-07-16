import React from 'react';

import styles from './app.module.scss';
// import AddSession from './add-session/add-session';
import SessionList from './components/session-listing/session-listing'

export function App() {
  return (
    <div>
      {/* <AddSession /> */}
      <SessionList  />
    </div>
  );
}

export default App;
