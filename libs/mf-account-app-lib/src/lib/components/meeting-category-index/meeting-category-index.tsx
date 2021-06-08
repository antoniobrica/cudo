import React from 'react';

import './meeting-category-index.module.scss';


import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import MeetingCategory from '../meeting-category/meeting-category';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: 'http://192.168.29.131:5001/graphql',
  cache: new InMemoryCache()
});
export interface MeetingCategoryIndexProps {
  parentCatagorySelect
}

export function MeetingCategoryIndex(props: MeetingCategoryIndexProps) {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <MeetingCategory parentCatagorySelect={props.parentCatagorySelect}></MeetingCategory>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default MeetingCategoryIndex;
