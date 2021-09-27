import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { MS_SERVICE_URL } from '@cudo/mf-core';
import BkpHierarchy from '../bkp-hierarchy/bkp-hierarchy';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_account'].url,
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface BkpHierarchyIndexProps {
  // parentBKPSelect?
  // bkp?
  // folderOpen?
}

export function BkpHierarchyIndex(props: BkpHierarchyIndexProps) {

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
      <BkpHierarchy />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default BkpHierarchyIndex;
