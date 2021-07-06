import React from 'react';

import './members-index.module.scss';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Members from '../members/members';
import { MS_SERVICE_URL } from '@cudo/mf-core'
/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_account'].url,
  cache: new InMemoryCache()
});
export interface MembersIndexProps {
  parentMembersSelect,
  members?,
}

export function MembersIndex(props: MembersIndexProps) {
  const onSelectF = (data) => {
    props.parentMembersSelect(data)
  }
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <Members members={props.members} parentMembersSelect={onSelectF} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default MembersIndex;
