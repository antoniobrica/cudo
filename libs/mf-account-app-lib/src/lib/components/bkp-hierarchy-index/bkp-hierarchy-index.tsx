import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { MS_SERVICE_URL } from '@cudo/mf-core';
import BkpHierarchy from '../bkp-hierarchy/bkp-hierarchy';

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_account'].url,
  cache: new InMemoryCache()
});
/* eslint-disable-next-line */
export interface BkpHierarchyIndexProps {
  // parentBKPSelect?
  // bkp?
  // folderOpen?
  data?
  addBkpCosts?
  deleteBkp
  updateBkpCost
  addLoading?
  addData?
  deleteLoading?
  deleteData?
  updateLoading?
  updateData?
}

export function BkpHierarchyIndex(props: BkpHierarchyIndexProps) {

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <BkpHierarchy
          data={props.data}
          addBkpCosts={props.addBkpCosts}
          deleteBkp={props.deleteBkp}
          updateBkpCost={props.updateBkpCost}
          addLoading={props.addLoading}
          addData={props.addData}
          deleteLoading={props.deleteLoading}
          deleteData={props.deleteData}
          updateLoading={props.updateLoading}
          updateData={props.updateData}
        />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default BkpHierarchyIndex;
