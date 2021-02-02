import React from 'react';

import styles from './app.module.scss';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';
import Grid from '@material-ui/core/Grid';

import { Route, Link } from 'react-router-dom';
import MfAccountAppMount from './mf-account-app-mount/mf-account-app-mount';

export function App() {
  return (
    <div className={styles.app}>
      <header className="flex">
        <Logo width="75" height="75" />
        <h1>Welcome to mf-container-app!</h1>
      </header>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route
        path="/page-2"
        exact
        render={() => (
          <main>
          <Grid  >
           <MfAccountAppMount></MfAccountAppMount>
          </Grid>
        </main>
        )}
      />
      <body>
        
    </body>
      {/* END: routes */}
    </div>
    
  );
}

export default App;
