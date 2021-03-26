

import React from 'react';
import './phase-index.module.scss';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Bkp from '../bkp/bkp';
import Phase from '../phase/phase';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface PhaseIndexProps {
  parentPhaseSelect
}

export function PhaseIndex(props: PhaseIndexProps) {
  const onSelectPhase = (data) => {
    props.parentPhaseSelect(data)
  }
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <Phase parentPhaseSelect={onSelectPhase} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default PhaseIndex;

