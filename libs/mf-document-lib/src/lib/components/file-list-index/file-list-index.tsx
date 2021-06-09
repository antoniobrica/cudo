import React from 'react';

import './file-list-index.module.scss';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import FileList from '../file-list/file-list';
const client = new ApolloClient({
  uri: 'http://localhost:5003/graphql',
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface FileListIndexProps {
  isTaskFile,
  cancel
}

export function FileListIndex(props: FileListIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <FileList isTaskFile={props.isTaskFile} cancel={props.cancel} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default FileListIndex;
