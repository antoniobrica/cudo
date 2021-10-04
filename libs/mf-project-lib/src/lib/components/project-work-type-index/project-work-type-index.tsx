import React from 'react';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import ProjectWorkType from '../project-worktypes/project-worktypes';
import { MS_SERVICE_URL } from '@cudo/mf-core'

/* eslint-disable-next-line */
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_project'].url,
  cache: new InMemoryCache()
});

/* eslint-disable-next-line */
export interface ProjectWorkTypeIndexProps {
  label?
  workTypeID?
  parentWorkTypeSelect?
}

export function ProjectWorkTypeIndex(props: ProjectWorkTypeIndexProps) {
  const onChangeWorkType = (data) => {
    props.parentWorkTypeSelect(data)
  }

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client as any}>
        <ProjectWorkType label={props?.label} workTypeID={props?.workTypeID} parentWorkTypeSelect={onChangeWorkType} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default ProjectWorkTypeIndex;
