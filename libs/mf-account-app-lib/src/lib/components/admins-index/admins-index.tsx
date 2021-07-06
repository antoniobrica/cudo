import React from 'react';

import './admins-index.module.scss';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Admins from '../admins/admins';
import { MS_SERVICE_URL } from '@cudo/mf-core'
/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_account'].url,
  cache: new InMemoryCache()
});
export interface AdminsIndexProps {
  parentAdminsSelect,
  admins?,
}

export function AdminsIndex(props: AdminsIndexProps) {
  const onSelectF = (data) => {
    props.parentAdminsSelect(data)
  }
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <Admins admins={props.admins} parentAdminsSelect={onSelectF} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default AdminsIndex;
