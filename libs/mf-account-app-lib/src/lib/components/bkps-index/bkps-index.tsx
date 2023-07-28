
import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Bkps from '../bkps/bkps';
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_account'].url,
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface BkpsIndexProps {
  parentBKPSelect?
  bkp?
}

export function BkpsIndex(props: BkpsIndexProps) {
  const onSelectBkp = (data) => {
    props.parentBKPSelect(data)
  }
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <Bkps parentBKPSelect={onSelectBkp} bkp={props.bkp} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default BkpsIndex;

