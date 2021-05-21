import React from 'react';

import './file-list-index.module.scss';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import FileList from '../file-list/file-list';
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface FileListIndexProps {
  open,
  cancel,
  folderData
}

export function FileListIndex(props: FileListIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <FileList open={props.open} cancel={props.cancel} folderData={props.folderData} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default FileListIndex;
