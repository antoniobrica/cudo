import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client';
import * as serviceWorker from './serviceWorker';
import App from './app/app';

declare global {
  interface Window {
    renderTaskApp: any;
    unmountMeetingApp: any;
  }
}

const client = new ApolloClient({
  uri: 'http://localhost:5007/graphql',
  cache: new InMemoryCache(),
});

const RootComponent = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client as any}>
          <App />
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>
  </Suspense>
);

window.renderTaskApp = (containerId, history) => {
  const container = document.getElementById(containerId);
  if (container) {
    createRoot(container).render(<RootComponent />);
  }
  serviceWorker.unregister();
};

window.unmountMeetingApp = (containerId) => {
  // There's no equivalent to unmountComponentAtNode in React 18
  // https://github.com/reactwg/react-18/discussions/95
};

if (!document.getElementById('TaskApp-container')) {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(<RootComponent />);
  }
  serviceWorker.unregister();
}
