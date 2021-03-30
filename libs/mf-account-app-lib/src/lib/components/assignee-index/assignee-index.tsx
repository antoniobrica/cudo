import React from 'react';

import './assignee-index.module.scss';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Assignee from '../assignee/assignee';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface AssigneeIndexProps { }

export function AssigneeIndex(props: AssigneeIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <Assignee />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default AssigneeIndex;
