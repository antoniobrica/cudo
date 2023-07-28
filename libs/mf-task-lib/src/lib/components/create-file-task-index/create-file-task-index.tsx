import React from 'react';

import './create-file-task-index.module.scss';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Planning from '../planning/planning';
import CreateFileTask from '../create-file-task/create-file-task';
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_task'].url,
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface CreateFileTaskIndexProps {
  close,
  onSuccess
}

export function CreateFileTaskIndex(props: CreateFileTaskIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <CreateFileTask close={props.close} onSuccess={props.onSuccess}></CreateFileTask>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default CreateFileTaskIndex;
