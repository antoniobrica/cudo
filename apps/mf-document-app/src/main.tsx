import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client';
import * as serviceWorker from './serviceWorker';
import App from './app/app';
// import "./SubscriberWidgetElement";

declare global {
  interface Window {
    renderDocumentApp: any;
    unmountMeetingApp: any;
  }
}
const client = new ApolloClient({
  uri: 'http://localhost:5003/graphql',
  cache: new InMemoryCache(),
});

window.renderDocumentApp = (containerId, history) => {
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

window.unmountMeetingApp = (containerId) => {
  createRoot(document.getElementById(containerId)).unmount();
};

if (!document.getElementById('DocumentApp-container')) {
  createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client as any}>
          <App />
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
  serviceWorker.unregister();
}
