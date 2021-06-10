import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import './house-structure-index.module.scss';
import { HouseStructure } from '@cudo/mf-account-app-lib';
import { MS_SERVICE_URL } from '@cudo/mf-core'
/* eslint-disable-next-line */
export interface HouseStructureIndexProps { }
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_account'].url,
  cache: new InMemoryCache()
});
export function HouseStructureIndex(props: HouseStructureIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <HouseStructure></HouseStructure>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default HouseStructureIndex;
