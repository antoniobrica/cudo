

import React from 'react';
import './phase-index.module.scss';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Bkp from '../bkp/bkp';
import Phase from '../phase/phase';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: 'http://cudo-ms-account.softobiz.net/graphql',
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface PhaseIndexProps {
  parentPhaseSelect
  phaseName?
}

export function PhaseIndex(props: PhaseIndexProps) {
  const onSelectPhase = (data) => {
    props.parentPhaseSelect(data)
  }
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <Phase phaseName={props.phaseName} parentPhaseSelect={onSelectPhase} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default PhaseIndex;

