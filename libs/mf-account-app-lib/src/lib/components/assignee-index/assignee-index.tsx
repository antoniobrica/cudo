import React from 'react';

import './assignee-index.module.scss';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client'
import Assignee from '../assignee/assignee';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface AssigneeIndexProps {
  parentAsigneeSelect
}

export function AssigneeIndex(props: AssigneeIndexProps) {
  const onSelectAsignee = (data) => {
    props.parentAsigneeSelect(data)
  }
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <Assignee parentBKPSelect={onSelectAsignee} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default AssigneeIndex;
