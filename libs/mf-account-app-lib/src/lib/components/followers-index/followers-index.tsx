import React from 'react';

import './followers-index.module.scss';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Followers from '../followers/followers';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache()
});
export interface FollowersIndexProps {}

export function FollowersIndex(props: FollowersIndexProps) {
  return (
    <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
     <Followers />
   </ApolloHooksProvider>
   </ApolloProvider>
  );
}

export default FollowersIndex;
