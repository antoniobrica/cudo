import React from 'react';

import styles from './app.module.scss';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link } from 'react-router-dom';
import AddFile from './components/add-file/add-file';
import FileListing from './components/file-listing/file-listing';


export function App() {
  return (
    <div >
      <AddFile></AddFile>   
      <FileListing></FileListing>
    </div>
  );
}

export default App;
