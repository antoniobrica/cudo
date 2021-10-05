import React from 'react';

import { MS_SERVICE_URL } from '@cudo/mf-core'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import FileImage from '../file-image/file-image';
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_document'].url,
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface FileImageIndexProps {
  file?
  open?
  close?
}

export function FileImageIndex(props: FileImageIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <FileImage file={props.file} open={props.open} close={props.close} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default FileImageIndex;
