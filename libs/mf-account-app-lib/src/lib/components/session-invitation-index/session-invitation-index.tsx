import React from 'react';

import './session-invitation-index.module.scss';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import SessionInvitation from '../session-invitation/session-invitation';
/* eslint-disable-next-line */
export interface SessionInvitationIndexProps {
  parentInvitationSelect
}
const client = new ApolloClient({
  uri: 'http://192.168.29.131:5001/graphql',
  cache: new InMemoryCache()
});

export function SessionInvitationIndex(props: SessionInvitationIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <SessionInvitation parentInvitationSelect={props.parentInvitationSelect}></SessionInvitation>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default SessionInvitationIndex;
