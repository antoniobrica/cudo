import React from 'react';

import './file-structure-index.module.scss';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import FileStructure from '../file-structure/file-structure';
 
/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface FileStructureIndexProps {}

export function FileStructureIndex(props: FileStructureIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <FileStructure />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default FileStructureIndex;
