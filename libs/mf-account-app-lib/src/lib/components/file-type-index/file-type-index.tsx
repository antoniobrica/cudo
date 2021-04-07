import React from 'react';
import './file-type-index.module.scss';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import FileType from '../file-type/file-type';
 
/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface FileTypeIndexProps {
  parentFileTypeSelect
}

export function FileTypeIndex(props: FileTypeIndexProps) {
  const onFileType =(data)=>{
   props.parentFileTypeSelect(data)
  }

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <FileType parentFileTypeSelect={onFileType}/>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default FileTypeIndex;
