
import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Bkp from '../bkp/bkp';
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_account'].url,
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface BkpIndexProps {
  parentBKPSelect?
  bkp?
  folderOpen?
}

export function BkpIndex(props: BkpIndexProps) {
  const onSelectBkp = (data) => {
    props.parentBKPSelect(data)
  }
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <Bkp parentBKPSelect={onSelectBkp} bkp={props.bkp} folderOpen={props.folderOpen} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default BkpIndex;
