import React from 'react';

import './session-protocol-index.module.scss';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import SessionProtocol from '../session-protocol/session-protocol';
import { MS_SERVICE_URL } from '@cudo/mf-core'
/* eslint-disable-next-line */
export interface SessionProtocolIndexProps { }
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_account'].url,
  cache: new InMemoryCache()
});
export interface SessionProtocolIndexProps {
  parentSessionSelect?
  editProtocolTemplateIdSelect?
  error?
}

export function SessionProtocolIndex(props: SessionProtocolIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <SessionProtocol parentSessionSelect={props.parentSessionSelect} editProtocolTemplateIdSelect={props?.editProtocolTemplateIdSelect} error={props?.error} ></SessionProtocol>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default SessionProtocolIndex;
