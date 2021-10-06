import React from 'react';
import { PinCompletedTaskList } from '@cudo/mf-task-lib'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
export interface PinCompletedTaskListIndexProps {
  filesData?
  cord?
  pinCompletedCount?
  taskHovered?
  parentWiseTaskFetch?
  isVersionSelected?
  isCompletedTaskShow?
}
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_task'].url,
  cache: new InMemoryCache()
});
export function PinCompletedTaskListIndex(props: PinCompletedTaskListIndexProps) {
  const getCompletedTaskHovered = (taskTypeID) => {
    props.taskHovered(taskTypeID)
  }
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <PinCompletedTaskList
          filesData={props.filesData}
          cord={props.cord}
          pinCompletedCount={props?.pinCompletedCount}
          taskHovered={getCompletedTaskHovered}
          parentWiseTaskFetch={props?.parentWiseTaskFetch}
          isVersionSelected={props?.isVersionSelected}
          isCompletedTaskShow={props?.isCompletedTaskShow}
        ></PinCompletedTaskList>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default PinCompletedTaskListIndex;
