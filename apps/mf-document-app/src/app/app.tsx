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
const defaultLanguage = 'en-GB';
const supportedLanguages = [defaultLanguage, 'en-GB'];
initI18n('/assets/i18n/{{lng}}.json', defaultLanguage);

export function App() {
  console.log(' mf document app')
  return (
    <div >
       <Suspense fallback={<div>Loading....</div>}>
      <AddFile></AddFile>   
      <FileListing></FileListing>
      </Suspense>
    </div>



  );  
}

export default App;
