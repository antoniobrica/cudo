import React from 'react';

import './assignee-index.module.scss';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Assignee from '../assignee/assignee';
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_account'].url,
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface AssigneeIndexProps {
  parentAsigneeSelect,
  name?
}

export function AssigneeIndex(props: AssigneeIndexProps) {
  const onSelectAsignee = (data) => {
    props.parentAsigneeSelect(data)
  }
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <Assignee parentBKPSelect={onSelectAsignee} name={props.name} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default AssigneeIndex;
