
import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client'
import Planning from '../planning/planning';
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_task'].url,
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface PlanningIndexProps {
  worktypes
}

export function PlanningIndex(props: PlanningIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <Planning worktypes={props.worktypes}></Planning>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default PlanningIndex;

