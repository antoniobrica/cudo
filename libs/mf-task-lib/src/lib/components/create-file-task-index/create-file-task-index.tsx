import React from 'react';

import './create-file-task-index.module.scss';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Planning from '../planning/planning';
import CreateFileTask from '../create-file-task/create-file-task';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: 'http://localhost:5007/graphql',
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface CreateFileTaskIndexProps { }

export function CreateFileTaskIndex(props: CreateFileTaskIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <CreateFileTask ></CreateFileTask>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default CreateFileTaskIndex;
