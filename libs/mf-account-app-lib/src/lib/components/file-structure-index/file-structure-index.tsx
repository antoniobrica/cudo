import React from 'react';

import './file-structure-index.module.scss';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client'
import FileStructure from '../file-structure/file-structure';
 
/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface FileStructureIndexProps {
  parentFileStructureSelect
}

export function FileStructureIndex(props: FileStructureIndexProps) {
  const onFileStructure = (data) => {
    props.parentFileStructureSelect(data)
  }
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <FileStructure parentFileStructureSelect={onFileStructure}/>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default FileStructureIndex;
