import React from 'react';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import './mf-account-app-lib.module.scss';
import Country from './components/country/country';

/* eslint-disable-next-line */
export interface MfAccountAppLibProps {
  parentCallback
}
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache()
});
export function MfAccountAppLib(props: MfAccountAppLibProps) {

  const onSelectCountry = (data) => {
    props?.parentCallback(data)
  }
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <Country parentCallback={onSelectCountry} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default MfAccountAppLib;
