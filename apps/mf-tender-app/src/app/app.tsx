import React from 'react';

import styles from './app.module.scss';
import { SetForm, SetList } from '@cudo/ui';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink
} from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3333/graphql',
  }),
});
const App = () => (
  <ApolloProvider  client={client}>
    <h1>Tender APP</h1>
    <div className="flex">
      <SetForm />
      <SetList />
    </div>
  </ApolloProvider>
);

export default App;
