import React from 'react';

import './file-list-index.module.scss';
import { MS_SERVICE_URL } from '@cudo/mf-core'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import FileList from '../file-list/file-list';
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_document'].url,
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface FileListIndexProps {
  isTaskFile,
  cancel
  onlyAddFileToTask?
}

export function FileListIndex(props: FileListIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <FileList onlyAddFileToTask={props.onlyAddFileToTask} isTaskFile={props.isTaskFile} cancel={props.cancel} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default FileListIndex;
