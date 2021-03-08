
import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Bkp from '../bkp/bkp';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface BkpIndexProps {}

export function BkpIndex(props: BkpIndexProps) {
  return (
    <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
     <Bkp />
   </ApolloHooksProvider>
   </ApolloProvider>
  );
}

export default BkpIndex;
