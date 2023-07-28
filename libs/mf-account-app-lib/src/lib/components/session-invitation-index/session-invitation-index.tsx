import React from 'react';

import './session-invitation-index.module.scss';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import SessionInvitation from '../session-invitation/session-invitation';
import { MS_SERVICE_URL } from '@cudo/mf-core'
/* eslint-disable-next-line */
export interface SessionInvitationIndexProps {
  parentInvitationSelect?
  editInvitationTemplateIdSelect?
  error?
}
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_account'].url,
  cache: new InMemoryCache()
});

export function SessionInvitationIndex(props: SessionInvitationIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <SessionInvitation parentInvitationSelect={props.parentInvitationSelect} editInvitationTemplateIdSelect={props?.editInvitationTemplateIdSelect}
        error={props?.error}></SessionInvitation>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default SessionInvitationIndex;
