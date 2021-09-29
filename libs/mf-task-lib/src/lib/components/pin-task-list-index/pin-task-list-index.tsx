import React from 'react';

import './pin-task-list-index.module.scss';
import { PinTaskList } from '@cudo/mf-task-lib'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
export interface PinTaskListIndexProps {
  filesData?
  cord?
  pinCount?
  taskHovered?
  parentWiseTaskFetch?
  isVersionSelected?
}
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_task'].url,
  cache: new InMemoryCache()
});
export function PinTaskListIndex(props: PinTaskListIndexProps) {
  const getTaskHovered = (taskTypeID) => {
    props.taskHovered(taskTypeID)
  }
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <PinTaskList
          filesData={props.filesData}
          cord={props.cord}
          pinCount={props?.pinCount}
          taskHovered={getTaskHovered}
          parentWiseTaskFetch={props?.parentWiseTaskFetch}
          isVersionSelected={props?.isVersionSelected}
        ></PinTaskList>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default PinTaskListIndex;
