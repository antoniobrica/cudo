import React from 'react';

import './followers-index.module.scss';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Followers from '../followers/followers';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: 'http://cudo-ms-account.softobiz.net/graphql',
  cache: new InMemoryCache()
});
export interface FollowersIndexProps {
  parentFollowersSelect
}

export function FollowersIndex(props: FollowersIndexProps) {
  const onSelectF = (data) => {
    props.parentFollowersSelect(data)
  }
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <Followers parentFollowersSelect={onSelectF} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default FollowersIndex;
