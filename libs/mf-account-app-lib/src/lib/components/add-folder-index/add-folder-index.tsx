
import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import './add-folder-index.module.scss';
import AddFolder from '../add-folder/add-folder';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: 'http://192.168.29.131:5001/graphql',
  cache: new InMemoryCache()
});
export interface AddFolderIndexProps {
  open,
  cancel,
  folderData
}

export function AddFolderIndex(props: AddFolderIndexProps) {

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <AddFolder open={props.open} cancel={props.cancel} folderData={props.folderData} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default AddFolderIndex;
