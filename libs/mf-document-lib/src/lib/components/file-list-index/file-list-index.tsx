import React from 'react';

import './file-list-index.module.scss';
import { MS_SERVICE_URL } from '@cudo/mf-core'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import FileList from '../file-list/file-list';
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_document'].url,
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface FileListIndexProps {
  isTaskFile,
  cancel
  onlyAddFileToTask?
  addSelectedFiles?
  selectedFiles?
}

export function FileListIndex(props: FileListIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <FileList  isTaskFile={props.isTaskFile} selectedFiles={props.selectedFiles} cancel={props.cancel} addSelectedFiles={props.addSelectedFiles} onlyAddFileToTask={props?.onlyAddFileToTask}/>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default FileListIndex;
