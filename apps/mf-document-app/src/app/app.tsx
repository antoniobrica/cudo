import React, { Suspense } from 'react';

import styles from './app.module.scss';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link } from 'react-router-dom';
import AddFile from './components/add-file/add-file';
import FileListing from './components/file-listing/file-listing';
import { initI18n } from '@cudo/mf-core';
// const AddFile = React.lazy(()=> import('./components/add-file/add-file'));
// const FileListing = React.lazy(() => import('./components/file-listing/file-listing'));

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import config from './redux/store'

const defaultLanguage = 'en-GB';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('/assets/i18n/{{lng}}.json', defaultLanguage);

const { store, persistor } = config()

export function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div >
          <Suspense fallback={<div>Loading....</div>}>
            <AddFile></AddFile>
            <FileListing></FileListing>
          </Suspense>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
// comment to update changed to libs shared
