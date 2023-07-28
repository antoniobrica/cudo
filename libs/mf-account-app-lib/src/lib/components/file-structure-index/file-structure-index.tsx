import React from 'react';

import './file-structure-index.module.scss';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client';
import FileStructure from '../file-structure/file-structure';
import { MS_SERVICE_URL } from '@cudo/mf-core';
/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_account'].url,
  cache: new InMemoryCache(),
});
/* eslint-disable-next-line */
export interface FileStructureIndexProps {
  parentFileStructureSelect;
  structureTitle;
}

export function FileStructureIndex(props: FileStructureIndexProps) {
  const onFileStructure = (data) => {
    props.parentFileStructureSelect(data);
  };
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <FileStructure structureTitle={props.structureTitle} parentFileStructureSelect={onFileStructure} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default FileStructureIndex;
