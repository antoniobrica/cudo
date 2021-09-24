
import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import './add-folder-index.module.scss';
import AddFolder from '../add-folder/add-folder';
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_account'].url,
  cache: new InMemoryCache()
});
export interface AddFolderIndexProps {
  open,
  cancel,
  folderData
  parentBKPSelect?
  setSelectedFolderData?
}

export function AddFolderIndex(props: AddFolderIndexProps) {

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <AddFolder open={props.open} cancel={props.cancel} folderData={props.folderData} parentBKPSelect={props.parentBKPSelect} setSelectedFolderData={props.setSelectedFolderData} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default AddFolderIndex;
