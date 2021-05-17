import React, { Suspense } from 'react';

import styles from './app.module.scss';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link } from 'react-router-dom';
import AddFile from './components/add-file/add-file';
import FileListing from './components/file-listing/file-listing';
// const AddFile = React.lazy(()=> import('./components/add-file/add-file'));
// const FileListing = React.lazy(() => import('./components/file-listing/file-listing'));


export function App() {
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
