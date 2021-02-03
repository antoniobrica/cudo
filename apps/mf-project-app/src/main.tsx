import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'



import App from './app/app';
const client = new ApolloClient({
  uri: 'https://tyoku.sse.codesandbox.io/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App />
      </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
