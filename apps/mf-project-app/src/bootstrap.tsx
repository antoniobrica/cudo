import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';
import './SubscriberWidgetElement';
import App from './app/app';
import { Dimmer, Loader } from 'semantic-ui-react';

const LazyLoading = () => (
  <Dimmer active inverted>
    <Loader inverted>Loading</Loader>
  </Dimmer>
);

declare global {
  interface Window {
    renderProjectApp: any;
    unmountProjectApp: any;
  }
}
const client = new ApolloClient({
  // uri: 'http://localhost:5005/graphql',
  uri: 'http://20.199.178.58:5005/graphql',
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Suspense fallback={<LazyLoading />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  );
}
serviceWorker.unregister();
