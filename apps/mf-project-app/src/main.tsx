import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import 'semantic-ui-css/semantic.min.css';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client';
import * as serviceWorker from './serviceWorker';
import './SubscriberWidgetElement';
import App from './app/app';

declare global {
  interface Window {
    renderProjectApp: any;
    unmountProjectApp: any;
  }
}
const client = new ApolloClient({
  uri: 'http://localhost:5005/graphql',
  cache: new InMemoryCache(),
});

window.renderProjectApp = (containerId, history) => {
  createRoot(document.getElementById(containerId)).render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client as any}>
          <App />
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
  serviceWorker.unregister();
};

window.unmountProjectApp = (containerId) => {
  createRoot(document.getElementById(containerId)).unmount();
};

if (!document.getElementById('ProjectApp-container')) {
  createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client as any}>
          Hello world
          <App />
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
  serviceWorker.unregister();
}
