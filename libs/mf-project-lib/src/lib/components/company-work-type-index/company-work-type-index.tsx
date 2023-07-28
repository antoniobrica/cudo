import React from 'react';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client'
import CompanyWorkType from '../company-work-type/company-work-type';
import { MS_SERVICE_URL } from '@cudo/mf-core'

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_project'].url,
  cache: new InMemoryCache()
});

/* eslint-disable-next-line */
export interface CompanyWorkTypeIndexProps {
  label?
  workTypeID?
  parentWorkTypeSelect?
}

export function CompanyWorkTypeIndex(props: CompanyWorkTypeIndexProps) {
  const onChangeWorkType = (data) => {
    props.parentWorkTypeSelect(data)
  }

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <CompanyWorkType label={props?.label} workTypeID={props?.workTypeID} parentWorkTypeSelect={onChangeWorkType} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default CompanyWorkTypeIndex;
