import React from 'react';

import './session-protocol-index.module.scss';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import SessionProtocol from '../session-protocol/session-protocol';
/* eslint-disable-next-line */
export interface SessionProtocolIndexProps { }
const client = new ApolloClient({
  uri: 'http://192.168.0.31:5001/graphql',
  cache: new InMemoryCache()
});
export interface SessionProtocolIndexProps {
  parentSessionSelect
}

export function SessionProtocolIndex(props: SessionProtocolIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <SessionProtocol parentSessionSelect={props.parentSessionSelect}></SessionProtocol>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default SessionProtocolIndex;
